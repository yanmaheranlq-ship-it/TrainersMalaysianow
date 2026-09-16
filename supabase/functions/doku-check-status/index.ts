import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.110.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

function uint8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

async function hmacSha256Base64(key: string, data: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    new TextEncoder().encode(data)
  );
  return uint8ToBase64(new Uint8Array(sig));
}

function mapStatus(raw: string): "paid" | "failed" | "pending" {
  const s = raw.toUpperCase();
  if (s === "SUCCESS" || s === "PAID" || s === "SETTLED") return "paid";
  if (s === "FAILED" || s === "EXPIRED" || s === "CANCELLED" || s === "ORDER_EXPIRED") {
    return "failed";
  }
  return "pending";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { invoice_number } = await req.json();
    if (!invoice_number || typeof invoice_number !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing invoice_number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fast path: if we already know the final status, return it.
    const { data: existing } = await supabase
      .from("payments")
      .select("status")
      .eq("invoice_number", invoice_number)
      .maybeSingle();

    if (existing && (existing.status === "paid" || existing.status === "failed")) {
      return new Response(
        JSON.stringify({ status: existing.status }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const clientId = Deno.env.get("DOKU_CLIENT_ID") ?? "";
    const secretKey = Deno.env.get("DOKU_SECRET_KEY") ?? "";
    if (!clientId || !secretKey) {
      return new Response(
        JSON.stringify({ error: "DOKU credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const requestId = crypto.randomUUID();
    const requestTimestamp = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    const requestTarget = `/orders/v1/status/${invoice_number}`;

    // GET requests are signed without a Digest component.
    const signatureComponents = [
      `Client-Id:${clientId}`,
      `Request-Id:${requestId}`,
      `Request-Timestamp:${requestTimestamp}`,
      `Request-Target:${requestTarget}`,
    ].join("\n");

    const signature = await hmacSha256Base64(secretKey, signatureComponents);

    const dokuApiBase = Deno.env.get("DOKU_API_BASE") ?? "https://api.doku.com";
    const dokuResponse = await fetch(`${dokuApiBase}${requestTarget}`, {
      method: "GET",
      headers: {
        "Client-Id": clientId,
        "Request-Id": requestId,
        "Request-Timestamp": requestTimestamp,
        Signature: `HMACSHA256=${signature}`,
      },
    });

    const dokuText = await dokuResponse.text();
    let dokuData: Record<string, unknown> = {};
    try {
      dokuData = JSON.parse(dokuText);
    } catch {
      // Not-yet-available or non-JSON response: treat as still pending.
      return new Response(
        JSON.stringify({ status: "pending" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 404 means DOKU has no transaction record yet: still pending.
    if (dokuResponse.status === 404) {
      return new Response(
        JSON.stringify({ status: "pending" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const transaction = (dokuData.transaction ?? {}) as Record<string, unknown>;
    const order = (dokuData.order ?? {}) as Record<string, unknown>;
    const rawStatus = String(transaction.status ?? order.status ?? "");
    const internalStatus = mapStatus(rawStatus);
    const dokuTransactionId = transaction.original_request_id as string | undefined;

    if (internalStatus !== "pending") {
      const updateData: Record<string, unknown> = {
        status: internalStatus,
        updated_at: new Date().toISOString(),
      };
      if (dokuTransactionId) updateData.doku_transaction_id = String(dokuTransactionId);
      await supabase
        .from("payments")
        .update(updateData)
        .eq("invoice_number", invoice_number);
    }

    return new Response(
      JSON.stringify({ status: internalStatus }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
