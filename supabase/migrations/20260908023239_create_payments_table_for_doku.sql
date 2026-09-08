/*
# Create payments table for DOKU subscription tracking

1. New Tables
   - `payments`
     - `id` (uuid, primary key)
     - `invoice_number` (text, unique) — DOKU invoice number
     - `trainer_name` (text)
     - `trainer_email` (text)
     - `trainer_phone` (text)
     - `trainer_id` (text) — temporary trainer ID from checkout
     - `plan` (text) — 'standard' or 'special'
     - `amount` (numeric, default 19.90)
     - `status` (text, default 'pending') — 'pending', 'paid', 'failed'
     - `payment_url` (text, nullable) — DOKU checkout URL
     - `doku_transaction_id` (text, nullable) — DOKU transaction ID from webhook
     - `created_at` (timestptz, default now())
     - `updated_at` (timestamptz, default now())

2. Security
   - Enable RLS on `payments`.
   - This is a no-auth app (no sign-in screen), so allow anon + authenticated CRUD.
   - SELECT: anyone can read (needed for polling payment status)
   - INSERT: anyone can insert (checkout creates a pending record)
   - UPDATE: anyone can update (webhook updates status)
   - DELETE: not needed, omitted

3. Important Notes
   - The `status` column is the single source of truth for payment confirmation.
   - The frontend polls this table to detect when DOKU confirms payment.
   - The DOKU webhook edge function updates `status` to 'paid' upon notification.
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  trainer_name text NOT NULL,
  trainer_email text NOT NULL,
  trainer_phone text NOT NULL,
  trainer_id text NOT NULL,
  plan text NOT NULL DEFAULT 'standard',
  amount numeric NOT NULL DEFAULT 19.90,
  status text NOT NULL DEFAULT 'pending',
  payment_url text,
  doku_transaction_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow anon + authenticated to read payment status (needed for polling)
DROP POLICY IF EXISTS "anon_select_payments" ON payments;
CREATE POLICY "anon_select_payments" ON payments FOR SELECT
  TO anon, authenticated USING (true);

-- Allow anon + authenticated to insert new payment records
DROP POLICY IF EXISTS "anon_insert_payments" ON payments;
CREATE POLICY "anon_insert_payments" ON payments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Allow anon + authenticated to update payment status (webhook uses service role, but anon also needs for edge function)
DROP POLICY IF EXISTS "anon_update_payments" ON payments;
CREATE POLICY "anon_update_payments" ON payments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
