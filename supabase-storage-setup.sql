-- Создание Storage Bucket для изображений постов
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS политики для bucket post-images
CREATE POLICY "Админ может загружать изображения" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'post-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Админ может обновлять изображения" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'post-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Админ может удалять изображения" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'post-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Все могут просматривать изображения" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'post-images');

