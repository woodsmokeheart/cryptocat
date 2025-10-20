-- Таблица для слайдов главной страницы
CREATE TABLE IF NOT EXISTS slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  heading TEXT NOT NULL,
  title TEXT NOT NULL,
  title_accent TEXT NOT NULL,
  description TEXT NOT NULL,
  description_accent TEXT NOT NULL,
  link_url TEXT,
  link_text TEXT,
  background_image TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_slides_author_id ON slides(author_id);
CREATE INDEX IF NOT EXISTS idx_slides_order ON slides(order_index ASC);
CREATE INDEX IF NOT EXISTS idx_slides_active ON slides(is_active);
CREATE INDEX IF NOT EXISTS idx_slides_created_at ON slides(created_at DESC);

-- RLS (Row Level Security) политики
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;

-- Политика: админ может все
CREATE POLICY "Admin can do everything with slides" ON slides
  FOR ALL
  USING (auth.uid() = author_id);

-- Политика: публичное чтение активных слайдов
CREATE POLICY "Public can read active slides" ON slides
  FOR SELECT
  USING (is_active = true);

-- Триггер для обновления updated_at
CREATE TRIGGER update_slides_updated_at BEFORE UPDATE ON slides
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
