-- FAQ карточки
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL, -- HTML контент из TipTap редактора
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_faq_items_slug ON faq_items(slug);
CREATE INDEX IF NOT EXISTS idx_faq_items_active ON faq_items(is_active);
CREATE INDEX IF NOT EXISTS idx_faq_items_order ON faq_items(display_order);
CREATE INDEX IF NOT EXISTS idx_faq_items_created_at ON faq_items(created_at);

-- RLS политики
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (все могут читать активные FAQ)
CREATE POLICY "Anyone can view active faq items" ON faq_items
  FOR SELECT USING (is_active = true);

-- Политика для админов (полный доступ)
CREATE POLICY "Admins can manage faq items" ON faq_items
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'cryptocatagency2@gmail.com'
  );

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_faq_items_updated_at 
  BEFORE UPDATE ON faq_items 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
