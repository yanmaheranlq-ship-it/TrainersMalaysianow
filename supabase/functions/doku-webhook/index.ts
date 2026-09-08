import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.110.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Verify the request is from DOKU using the DOKU notification key
    const dokuKey = Deno.env.get("DOKU_NOTIFICATION_KEY") ?? "";
    const authHeader = req.headers.get("Authorization") ?? "";
    const providedKey = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (dokuKey && providedKey && providedKey !== dokuKey) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: invalid notification key" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const payload = await req.json();

    // DOKU notification payload contains order.invoice_number and transaction status
    const order = payload.order ?? payload.data?.order ?? {};
    const invoiceNumber: string | undefined =
      order.invoice_number ?? payload.invoice_number;

    if (!invoiceNumber) {
      return new Response(
        JSON.stringify({ error: "Missing invoice_number" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Determine payment status from DOKU notification
    // DOKU sends transaction.status as "SUCCESS" for completed payments
    const transaction = payload.transaction ?? payload.data?.transaction ?? {};
    const dokuStatus: string = (transaction.status ?? payload.status ?? "").toUpperCase();
    const dokuTransactionId: string | undefined =
      transaction.transaction_id ?? payload.transaction_id;

    // Map DOKU status to our internal status
    let internalStatus = "pending";
    if (dokuStatus === "SUCCESS" || dokuStatus === "PAID" || dokuStatus === "SETTLED") {
      internalStatus = "paid";
    } else if (dokuStatus === "FAILED" || dokuStatus === "EXPIRED" || dokuStatus === "CANCELLED") {
      internalStatus = "failed";
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const updateData: Record<string, unknown> = {
        status: internalStatus,
        updated_at: new Date().toISOString(),
      };
      if (dokuTransactionId) {
        updateData.doku_transaction_id = dokuTransactionId;
      }

      await supabase
        .from("payments")
        .update(updateData)
        .eq("invoice_number", invoiceNumber);
    }

    return new Response(
      JSON.stringify({ received: true, invoice_number: invoiceNumber, status: internalStatus }),
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
