-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Allow users to upload their own resumes (using auth.uid() directly)
CREATE POLICY "upload_own_resumes" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes' AND auth.uid()::text = (json_build_object('user_id', auth.uid()) ->> 'user_id'));

-- Allow users to read their own resumes  
CREATE POLICY "read_own_resumes" ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes' AND auth.uid()::text = (json_build_object('user_id', auth.uid()) ->> 'user_id'));

-- Allow service role full access (for processing)
CREATE POLICY "service_role_access" ON storage.objects FOR ALL
  TO service_role USING (bucket_id = 'resumes');