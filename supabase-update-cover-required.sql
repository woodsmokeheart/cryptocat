-- Обновление схемы для обязательной обложки поста
-- ВНИМАНИЕ: Это изменение сделает поле cover_image обязательным!

-- Сначала проверим текущую структуру таблицы
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'cover_image';

-- Обновляем поле cover_image, делая его NOT NULL
ALTER TABLE posts ALTER COLUMN cover_image SET NOT NULL;

-- Проверяем результат
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'cover_image';
