/*
# Add subscription status to trainers table

1. Modified Tables
   - `trainers`
     - `subscription_status` (text, default 'pending') — tracks whether trainer has paid RM19.90 subscription
     - `subscription_plan` (text, nullable) — the plan name selected
     - `subscribed_at` (timestamptz, nullable) — when subscription was initiated

2. Important Notes
   - Existing trainers will default to 'pending' subscription status
   - Statuses: 'pending', 'active', 'expired'
*/

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'trainers' AND column_name = 'subscription_status') THEN
    ALTER TABLE trainers ADD COLUMN subscription_status text NOT NULL DEFAULT 'pending';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'trainers' AND column_name = 'subscription_plan') THEN
    ALTER TABLE trainers ADD COLUMN subscription_plan text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'trainers' AND column_name = 'subscribed_at') THEN
    ALTER TABLE trainers ADD COLUMN subscribed_at timestamptz;
  END IF;
END $$;
