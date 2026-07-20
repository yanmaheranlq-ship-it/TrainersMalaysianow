/*
# Add status column to registrations table

1. Modified Tables
   - `registrations`
     - Added `status` (text, default 'pending') - tracks approval status (pending/approved/rejected)

2. Security
   - No policy changes needed (existing policies already cover the column)

3. Notes
   - Uses DO block with IF NOT EXISTS for idempotency
   - Default 'pending' so existing registrations get a status value
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' AND column_name = 'status'
  ) THEN
    ALTER TABLE registrations ADD COLUMN status text NOT NULL DEFAULT 'pending';
  END IF;
END $$;
