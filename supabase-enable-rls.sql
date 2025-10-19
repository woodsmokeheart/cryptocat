-- Включаем RLS обратно и создаем правильную политику

-- Включаем RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Удаляем все существующие политики
DROP POLICY IF EXISTS "Публичный доступ к опубликованным постам" ON posts;
DROP POLICY IF EXISTS "Админ может управлять постами" ON posts;

-- Создаем политику для публичного доступа к опубликованным постам
CREATE POLICY "Публичный доступ к опубликованным постам" ON posts
  FOR SELECT
  USING (published = true);

-- Создаем политику для админа (полный доступ)
CREATE POLICY "Админ может управлять постами" ON posts
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Проверяем статус
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'posts';

-- Проверяем политики
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'posts';
