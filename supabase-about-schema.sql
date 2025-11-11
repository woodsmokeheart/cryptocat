-- Таблицы для модального окна "О нас"

-- Описание компании (храним единственную запись)
CREATE TABLE IF NOT EXISTS about_description (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE about_description ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read about description" ON about_description
  FOR SELECT
  USING (true);

CREATE POLICY "Admin has full access to about description" ON about_description
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'cryptocatagency2@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'cryptocatagency2@gmail.com');

CREATE TRIGGER update_about_description_updated_at
  BEFORE UPDATE ON about_description
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- Участники команды
CREATE TABLE IF NOT EXISTS about_team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_about_team_members_order ON about_team_members(display_order ASC, created_at DESC);

ALTER TABLE about_team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read about team members" ON about_team_members
  FOR SELECT
  USING (true);

CREATE POLICY "Admin has full access to about team members" ON about_team_members
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'cryptocatagency2@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'cryptocatagency2@gmail.com');

CREATE TRIGGER update_about_team_members_updated_at
  BEFORE UPDATE ON about_team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

