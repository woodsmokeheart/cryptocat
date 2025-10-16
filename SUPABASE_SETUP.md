# Настройка таблицы Posts в Supabase

## Шаг 1: Создание таблицы

1. Перейдите в панель Supabase: https://supabase.com/dashboard
2. Выберите ваш проект
3. Перейдите в **SQL Editor** (слева в меню)
4. Нажмите **New Query**
5. Скопируйте содержимое файла `supabase-schema.sql`
6. Вставьте в редактор SQL
7. Нажмите **Run** (или Ctrl+Enter)

## Шаг 2: Проверка таблицы

1. Перейдите в **Table Editor**
2. Вы должны увидеть таблицу `posts` с полями:
   - id (UUID, Primary Key)
   - title (Text)
   - content (Text)
   - excerpt (Text)
   - published (Boolean)
   - created_at (Timestamp)
   - updated_at (Timestamp)
   - author_id (UUID, Foreign Key)

## Шаг 3: Проверка политик безопасности

1. В **Table Editor** → `posts` → **Policies**
2. Должна быть политика: "Admin can do everything with posts"
3. Эта политика позволяет админу (тот кто создал пост) управлять своими постами

## Готово!

Теперь можно создавать, редактировать и удалять посты через админ-панель.

