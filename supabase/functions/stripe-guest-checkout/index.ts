import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  appInfo: { name: "Bolt Integration", version: "1.0.0" },
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const {
      trainer_name,
      trainer_email,
      trainer_phone,
      trainer_id,
      plan,
      amount,
      origin,
    } = await req.json();

    if (!trainer_name || !trainer_email || !trainer_phone || !trainer_id || !amount) {
      return json({ error: "Missing required fields" }, 400);
    }

    const baseUrl = String(origin || Deno.env.get("APP_BASE_URL") || "").replace(/\/$/, "");
    if (!baseUrl) {
      return json({ error: "Missing origin for redirect URLs" }, 400);
    }

    const invoiceNumber = `INV-${trainer_id}-${Date.now()}`;
    const unitAmount = Math.round(Number(amount) * 100);

    const { error: insertError } = await supabase.from("payments").insert({
      invoice_number: invoiceNumber,
      trainer_name,
      trainer_email,
      trainer_phone: String(trainer_phone),
      trainer_id,
      plan: plan ?? "standard",
      amount: Number(Number(amount).toFixed(2)),
      status: "pending",
      payment_url: null,
    });
    if (insertError) {
      console.error("Failed to insert pending payment:", insertError);
      return json({ error: "Failed to record payment" }, 500);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: trainer_email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "myr",
            unit_amount: unitAmount,
            product_data: {
              name: "Langganan Trainer LatihanQ",
              description: "Akses portal trainer",
            },
          },
        },
      ],
      metadata: { invoice_number: invoiceNumber, plan: plan ?? "standard" },
      success_url: `${baseUrl}/?payment=success&invoice=${invoiceNumber}`,
      cancel_url: `${baseUrl}/?payment=cancel&invoice=${invoiceNumber}`,
    });

    if (session.url) {
      await supabase
        .from("payments")
        .update({ payment_url: session.url })
        .eq("invoice_number", invoiceNumber);
    }

    return json({ payment_url: session.url, invoice_number: invoiceNumber, plan });
  } catch (err) {
    console.error("stripe-guest-checkout error:", err);
    return json({ error: (err as Error).message || "Payment initiation failed" }, 500);
  }
});
