/*
# Create trainer-avatars storage bucket

## Summary
- Creates a public storage bucket `trainer-avatars` to hold trainer profile avatar images.
- Currently, avatars are stored as base64 data URLs directly in the `trainers.avatar` column.
  Large base64 strings bloat the row, slow upserts, and can exceed column/payload limits.
  Moving image storage to Supabase Storage keeps the DB row small and gives proper
  CDN-backed URLs.

## Changes
1. New Storage bucket:
   - `trainer-avatars` (public = true) — anyone can read avatar images via the public URL.
2. Storage policies (the bucket is public, so reads are open; writes are open to anon/authenticated
   because the app uses the anon key for upserts and there is no per-user auth on this gallery).

## Notes
- The bucket is public so that avatar <img> tags can load via the public URL without a signed URL.
- Writes are intentionally open to anon + authenticated because this gallery app does not use
  Supabase Auth; the frontend talks to Supabase with the anon key for all CRUD.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('trainer-avatars', 'trainer-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone (anon + authenticated) to read avatar objects
DROP POLICY IF EXISTS "avatar_read_public" ON storage.objects;
CREATE POLICY "avatar_read_public"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'trainer-avatars');

-- Allow anyone (anon + authenticated) to upload avatar objects
DROP POLICY IF EXISTS "avatar_insert_open" ON storage.objects;
CREATE POLICY "avatar_insert_open"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'trainer-avatars');

-- Allow anyone (anon + authenticated) to update avatar objects (e.g. overwrite on re-upload)
DROP POLICY IF EXISTS "avatar_update_open" ON storage.objects;
CREATE POLICY "avatar_update_open"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'trainer-avatars')
WITH CHECK (bucket_id = 'trainer-avatars');

-- Allow anyone (anon + authenticated) to delete avatar objects
DROP POLICY IF EXISTS "avatar_delete_open" ON storage.objects;
CREATE POLICY "avatar_delete_open"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'trainer-avatars');
