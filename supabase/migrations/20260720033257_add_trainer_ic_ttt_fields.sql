ALTER TABLE trainers
  ADD COLUMN IF NOT EXISTS ic_number text,
  ADD COLUMN IF NOT EXISTS ttt_cert_no text;
