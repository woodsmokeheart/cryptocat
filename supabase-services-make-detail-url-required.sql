-- Обновление существующей базы данных: делаем detail_page_url обязательным полем
-- ВНИМАНИЕ: Перед выполнением убедитесь, что у всех существующих услуг заполнено поле detail_page_url

-- Сначала обновляем все NULL значения (если есть)
UPDATE services 
SET detail_page_url = '/services/' || id::text
WHERE detail_page_url IS NULL;

-- Теперь делаем поле обязательным
ALTER TABLE services 
ALTER COLUMN detail_page_url SET NOT NULL;

