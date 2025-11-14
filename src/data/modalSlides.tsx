import { SlideContent } from '../types/modal'
import FaqGrid from '../components/FaqGrid/FaqGrid'

// Services page slides
export const servicesSlides: SlideContent[] = [
  {
    id: 'blockchain',
    title: 'Блокчейн Разработка',
    content: (
      <div style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Смарт-контракты, DApps и индивидуальные блокчейн решения, адаптированные под ваши бизнес-потребности. 
          Мы помогаем вам использовать силу децентрализованных технологий.
        </p>
      </div>
    )
  },
  {
    id: 'webdev',
    title: 'Веб-Разработка',
    content: (
      <div style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Современные, адаптивные веб-приложения, созданные с использованием новейших технологий. 
          От простых сайтов до сложных веб-платформ.
        </p>
      </div>
    )
  },
  {
    id: 'consulting',
    title: 'Консультирование',
    content: (
      <div style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Стратегическое руководство по внедрению блокчейн технологий, интеграции криптовалют 
          и цифровой трансформации для вашего бизнеса.
        </p>
      </div>
    )
  }
]


// FAQ page slides
export const faqSlides: SlideContent[] = [
  {
    id: 'faq1',
    title: 'FAQ',
    content: <FaqGrid />,
    slideClassName: 'faqSlide'
  }
]

