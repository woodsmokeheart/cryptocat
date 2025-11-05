-- Таблица для услуг
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  detail_page_url TEXT NOT NULL, -- URL страницы с описанием услуги (обязательное поле, показывается кнопка "Подробнее")
  mobile_accordion_button_text TEXT DEFAULT 'Развернуть', -- Текст кнопки аккордеона для мобильной версии
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_services_created_by ON services(created_by);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at DESC);

-- RLS (Row Level Security) политики
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Политика: админ может все
CREATE POLICY "Admin can do everything with services" ON services
  FOR ALL
  USING (
    auth.jwt() ->> 'email' = 'cryptocatagency2@gmail.com'
  );

-- Политика: публичное чтение активных услуг
CREATE POLICY "Public can read active services" ON services
  FOR SELECT
  USING (is_active = true);

-- Триггер для обновления updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

