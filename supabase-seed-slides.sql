-- Заполнение таблицы слайдов начальными данными
-- ВНИМАНИЕ: Замените 'YOUR_USER_ID' на реальный ID пользователя из auth.users

-- Сначала получите ID пользователя:
-- SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com';

-- Вставка начальных слайдов
INSERT INTO slides (
  heading,
  title,
  title_accent,
  description,
  description_accent,
  link_url,
  link_text,
  background_image,
  order_index,
  is_active,
  author_id
) VALUES 
(
  'Компания',
  'Простота это',
  'сложность',
  'Мы предоставляем актуальные решения для каждого дня, независимо от',
  'стадии рынка.',
  '',
  '',
  '/img/background/hero-bg-1.jpg',
  0,
  true,
  (SELECT id FROM auth.users WHERE email = 'cryptocatagency2@gmail.com' LIMIT 1)
),
(
  'Сообщество',
  'Трейдинг - это',
  'процесс',
  'Самое активное и успешное сообщество, состоящее из более чем 10 000 трейдеров',
  'со всего мира.',
  '',
  '',
  '/img/background/hero-bg-2.jpg',
  1,
  true,
  (SELECT id FROM auth.users WHERE email = 'cryptocatagency2@gmail.com' LIMIT 1)
),
(
  'Команда',
  'Спокойствие - это',
  'решение',
  'Команда достойна называться',
  'лучшей в своей области.',
  '',
  '',
  '/img/background/hero-bg-3.jpg',
  2,
  true,
  (SELECT id FROM auth.users WHERE email = 'cryptocatagency2@gmail.com' LIMIT 1)
),
(
  'Будущее',
  'Достижения, которые',
  'впечатляют',
  'Уникальность подходов в сочетании с наставничеством и современными технологиями',
  'могут вас удивить.',
  '',
  '',
  '/img/background/hero-bg-4.jpg',
  3,
  true,
  (SELECT id FROM auth.users WHERE email = 'cryptocatagency2@gmail.com' LIMIT 1)
);

-- Проверяем результат
SELECT * FROM slides ORDER BY order_index;
