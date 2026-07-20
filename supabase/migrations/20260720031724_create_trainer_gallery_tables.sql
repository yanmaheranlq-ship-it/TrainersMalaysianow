/*
# Create trainer gallery tables (single-tenant, no auth)

1. New Tables
- `trainers`: trainer profiles (id, name, title, category, avatar, bio, rating,
  experience, certifications[], skills[], email, phone, password, featured,
  projects_count, socials jsonb, academic_qualification[], professional_qualification[],
  previous_companies[], training_topics[]).
- `portfolios`: training programs (id, trainer_id FK, trainer_name, trainer_avatar,
  title, category, description, image, duration, level, outcomes[],
  participants_count, status).
- `registrations`: session bookings (id, trainer_id, program_id, program_title,
  trainer_name, participant_name, participant_email, participant_phone, created_at,
  feedback_submitted).
- `feedbacks`: participant evaluations (id, registration_id, program_id, program_title,
  trainer_id, participant_name, rating_overall, rating_materials, rating_trainer,
  expectation_met, comment, created_at).

2. Security
- RLS enabled on every table.
- This app has no sign-in screen, so the anon-key client must read/write its own
  shared data. Policies use `TO anon, authenticated` with `USING (true)` /
  `WITH CHECK (true)` because the data is intentionally public/shared (single-tenant).

3. Notes
- IDs are text to preserve existing seed values (e.g. 't1', 'p1', 'REG-882001').
- `trainers.rating` is numeric(3,2) to preserve decimals like 4.96.
*/

CREATE TABLE IF NOT EXISTS trainers (
  id text PRIMARY KEY,
  name text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  avatar text,
  bio text,
  rating numeric(3,2) NOT NULL DEFAULT 0,
  experience text,
  certifications text[] NOT NULL DEFAULT '{}',
  skills text[] NOT NULL DEFAULT '{}',
  email text,
  phone text,
  password text,
  featured boolean NOT NULL DEFAULT false,
  projects_count integer NOT NULL DEFAULT 0,
  socials jsonb,
  academic_qualification text[] NOT NULL DEFAULT '{}',
  professional_qualification text[] NOT NULL DEFAULT '{}',
  previous_companies text[] NOT NULL DEFAULT '{}',
  training_topics text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolios (
  id text PRIMARY KEY,
  trainer_id text NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
  trainer_name text NOT NULL,
  trainer_avatar text,
  title text NOT NULL,
  category text NOT NULL,
  description text,
  image text,
  duration text,
  level text,
  outcomes text[] NOT NULL DEFAULT '{}',
  participants_count integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Selesai',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS registrations (
  id text PRIMARY KEY,
  trainer_id text NOT NULL,
  program_id text NOT NULL,
  program_title text NOT NULL,
  trainer_name text NOT NULL,
  participant_name text NOT NULL,
  participant_email text NOT NULL,
  participant_phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  feedback_submitted boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS feedbacks (
  id text PRIMARY KEY,
  registration_id text NOT NULL,
  program_id text NOT NULL,
  program_title text NOT NULL,
  trainer_id text NOT NULL,
  participant_name text NOT NULL,
  rating_overall integer NOT NULL DEFAULT 5,
  rating_materials integer NOT NULL DEFAULT 5,
  rating_trainer integer NOT NULL DEFAULT 5,
  expectation_met text NOT NULL DEFAULT 'Sangat Setuju',
  comment text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_portfolios_trainer_id ON portfolios(trainer_id);
CREATE INDEX IF NOT EXISTS idx_registrations_program_id ON registrations(program_id);
CREATE INDEX IF NOT EXISTS idx_registrations_trainer_id ON registrations(trainer_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_program_id ON feedbacks(program_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_trainer_id ON feedbacks(trainer_id);

ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- trainers policies (public/shared single-tenant data)
DROP POLICY IF EXISTS "anon_select_trainers" ON trainers;
CREATE POLICY "anon_select_trainers" ON trainers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trainers" ON trainers;
CREATE POLICY "anon_insert_trainers" ON trainers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trainers" ON trainers;
CREATE POLICY "anon_update_trainers" ON trainers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trainers" ON trainers;
CREATE POLICY "anon_delete_trainers" ON trainers FOR DELETE
  TO anon, authenticated USING (true);

-- portfolios policies
DROP POLICY IF EXISTS "anon_select_portfolios" ON portfolios;
CREATE POLICY "anon_select_portfolios" ON portfolios FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_portfolios" ON portfolios;
CREATE POLICY "anon_insert_portfolios" ON portfolios FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_portfolios" ON portfolios;
CREATE POLICY "anon_update_portfolios" ON portfolios FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_portfolios" ON portfolios;
CREATE POLICY "anon_delete_portfolios" ON portfolios FOR DELETE
  TO anon, authenticated USING (true);

-- registrations policies
DROP POLICY IF EXISTS "anon_select_registrations" ON registrations;
CREATE POLICY "anon_select_registrations" ON registrations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_registrations" ON registrations;
CREATE POLICY "anon_insert_registrations" ON registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_registrations" ON registrations;
CREATE POLICY "anon_update_registrations" ON registrations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_registrations" ON registrations;
CREATE POLICY "anon_delete_registrations" ON registrations FOR DELETE
  TO anon, authenticated USING (true);

-- feedbacks policies
DROP POLICY IF EXISTS "anon_select_feedbacks" ON feedbacks;
CREATE POLICY "anon_select_feedbacks" ON feedbacks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_feedbacks" ON feedbacks;
CREATE POLICY "anon_insert_feedbacks" ON feedbacks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_feedbacks" ON feedbacks;
CREATE POLICY "anon_update_feedbacks" ON feedbacks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_feedbacks" ON feedbacks;
CREATE POLICY "anon_delete_feedbacks" ON feedbacks FOR DELETE
  TO anon, authenticated USING (true);
