-- Создание bucket для изображений в Supabase Storage
-- Выполните этот скрипт в Supabase Dashboard → SQL Editor

-- Создаем bucket для изображений
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB в байтах
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Создаем политику для загрузки файлов (только для авторизованных пользователей)
CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Создаем политику для чтения файлов (публичный доступ)
CREATE POLICY "Public can view images" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Создаем политику для удаления файлов (только владелец)
CREATE POLICY "Users can delete their own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Проверяем, что bucket создан
SELECT * FROM storage.buckets WHERE id = 'images';