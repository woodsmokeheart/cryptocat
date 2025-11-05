-- Удаление поля button_text из таблицы services
-- Это поле больше не нужно, так как текст кнопки всегда "Подробнее" (хардкод в компоненте)

ALTER TABLE services 
DROP COLUMN IF EXISTS button_text;

