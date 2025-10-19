-- Удаление всех постов из таблицы posts
-- ВНИМАНИЕ: Это действие необратимо! Все посты будут удалены навсегда!

-- Сначала проверим, сколько постов у нас есть
SELECT COUNT(*) as total_posts FROM posts;

-- Покажем все посты перед удалением
SELECT id, title, published, created_at FROM posts ORDER BY created_at DESC;

-- Удаляем все посты
DELETE FROM posts;

-- Проверяем результат
SELECT COUNT(*) as remaining_posts FROM posts;
