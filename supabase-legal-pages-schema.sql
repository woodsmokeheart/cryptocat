-- Create table for legal pages (Privacy Policy and Terms of Use)
CREATE TABLE IF NOT EXISTS legal_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type VARCHAR(50) NOT NULL UNIQUE CHECK (page_type IN ('privacy_policy', 'terms_of_use')),
  title VARCHAR(255) NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS policies
ALTER TABLE legal_pages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read legal pages (public access)
CREATE POLICY "Legal pages are viewable by everyone" ON legal_pages
  FOR SELECT
  USING (true);

-- Policy: Only admins can insert, update, or delete legal pages
-- This policy will be enforced through service role key in API routes
-- Regular users cannot modify through the client

-- Index for faster queries by page_type
CREATE INDEX idx_legal_pages_type ON legal_pages(page_type);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_legal_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_legal_pages_updated_at
  BEFORE UPDATE ON legal_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_legal_pages_updated_at();

