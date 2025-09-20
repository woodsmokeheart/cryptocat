/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем строгий режим React
  reactStrictMode: true,
  
  // Оптимизация для продакшена
  swcMinify: true,
  
  // Поддержка экспериментальных функций
  experimental: {
    // В Next.js 14 appDir уже включен по умолчанию
  },
  
  // Настройки для изображений (адаптивные изображения)
  images: {
    // Домены, с которых разрешено загружать изображения
    domains: ['fonts.googleapis.com'],
    // Форматы изображений для оптимизации
    formats: ['image/webp', 'image/avif'],
    // Адаптивные размеры изображений
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // SEO и производительность
  poweredByHeader: false, // Убираем заголовок X-Powered-By
  
  // Сжатие
  compress: true,
}

module.exports = nextConfig
