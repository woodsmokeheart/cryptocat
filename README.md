# CryptoCat

Современный веб-сайт на Next.js с TypeScript и CSS Modules.

## Технологии

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - строгая типизация
- **CSS Modules** - изолированные стили
- **SEO-оптимизация** - встроенная поддержка meta-тегов, sitemap, robots.txt

## Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшн версии
npm start
```

## Структура проекта

```
src/
├── app/                 # App Router (Next.js 13+)
│   ├── layout.tsx      # Корневой layout
│   ├── page.tsx        # Главная страница
│   ├── page.module.css # Стили главной страницы
│   └── globals.css     # Глобальные стили
├── components/         # React компоненты
├── styles/            # Дополнительные стили
├── utils/             # Утилиты
└── types/             # TypeScript типы
```

## Особенности

- ✅ SEO-оптимизация из коробки
- ✅ TypeScript с строгой типизацией
- ✅ CSS Modules для изолированных стилей
- ✅ Адаптивный дизайн
- ✅ Оптимизация производительности
