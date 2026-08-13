import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

async function sha256Base64(data: string): Promise<string> {
  const encoded = new TextEncoder().encode(data);
  const hash = await crypto.subtle.digest("SHA-256", encoded);
  return uint8ToBase64(new Uint8Array(hash));
}

async function hmacSha256Base64(
  key: string,
  data: string
): Promise<string> {
  const keyData = new TextEncoder().encode(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get("DOKU_CLIENT_ID") ?? "";
    const secretKey = Deno.env.get("DOKU_SECRET_KEY") ?? "";

    if (!clientId || !secretKey) {
      return new Response(
        JSON.stringify({ error: "DOKU credentials not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const {
      trainer_name,
      trainer_email,
      trainer_phone,
      trainer_id,
      plan,
      amount,
    } = await req.json();

    if (!trainer_name || !trainer_email || !trainer_phone || !trainer_id || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const invoiceNumber = `INV-${trainer_id}-${Date.now()}`;
    const requestId = crypto.randomUUID();
    const requestTimestamp = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    const requestTarget = "/checkout/v1/payment";

    const body = {
      order: {
        amount: Math.round(amount),
        invoice_number: invoiceNumber,
      },
      payment: {
        payment_due_date: 60,
      },
      customer: {
        name: trainer_name,
        email: trainer_email,
        phone: trainer_phone,
      },
    };

    const bodyString = JSON.stringify(body);
    const digest = await sha256Base64(bodyString);

    const signatureComponents = [
      `Client-Id:${clientId}`,
      `Request-Id:${requestId}`,
      `Request-Timestamp:${requestTimestamp}`,
      `Request-Target:${requestTarget}`,
      `Digest:${digest}`,
    ].join("\n");

    const signature = await hmacSha256Base64(secretKey, signatureComponents);

    const dokuApiBase = Deno.env.get("DOKU_API_BASE") ?? "https://api.doku.com";
    const dokuResponse = await fetch(
      `${dokuApiBase}${requestTarget}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Client-Id": clientId,
          "Request-Id": requestId,
          "Request-Timestamp": requestTimestamp,
          Signature: `HMACSHA256=${signature}`,
        },
        body: bodyString,
      }
    );

    const dokuText = await dokuResponse.text();
    let dokuData: Record<string, unknown>;
    try {
      dokuData = JSON.parse(dokuText);
    } catch {
      return new Response(
        JSON.stringify({
          error: "Invalid response from DOKU",
          raw: dokuText.slice(0, 500),
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!dokuResponse.ok) {
      return new Response(
        JSON.stringify({
          error: "Payment initiation failed",
          details: dokuData,
        }),
        {
          status: dokuResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const resp = dokuData.response as Record<string, unknown> | undefined;
    const payment = (resp?.payment ?? dokuData.payment) as Record<string, unknown> | undefined;
    const paymentUrl = payment?.url as string | undefined
      ?? (dokuData as Record<string, unknown>).credit_card_token_page as string | undefined;

    return new Response(
      JSON.stringify({
        payment_url: paymentUrl ?? null,
        invoice_number: invoiceNumber,
        plan,
        raw: dokuData,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
