-- Добавление поля cover_image в таблицу posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- Комментарий к полю
COMMENT ON COLUMN posts.cover_image IS 'URL изображения обложки поста из Supabase Storage';

