import { SlideContent } from '../types/modal'

// About page slides
export const aboutSlides: SlideContent[] = [
  {
    id: 'mission',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Наша Миссия
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Мы - передовое цифровое агентство, специализирующееся на блокчейн технологиях, 
          криптовалютных решениях и инновационной веб-разработке. Наша миссия - 
          объединить традиционный бизнес с децентрализованным будущим.
        </p>
      </div>
    )
  },
  {
    id: 'values',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Наши Ценности
        </h3>
        <div style={{ display: 'grid', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
            <h4 style={{ color: '#FF7A3D', marginBottom: '10px' }}>Инновации</h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Мы находимся на передовой технологий, постоянно исследуя новые возможности в блокчейн и веб-разработке.
            </p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
            <h4 style={{ color: '#FF7A3D', marginBottom: '10px' }}>Прозрачность</h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Мы верим в открытое общение и прозрачные процессы на протяжении каждого проекта.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'team',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Наша Команда
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Наша разнообразная команда блокчейн экспертов, разработчиков и дизайнеров работает вместе, 
          чтобы обеспечить исключительные результаты. Мы сочетаем техническую экспертизу с творческим 
          видением, чтобы воплотить ваши идеи в жизнь.
        </p>
      </div>
    )
  }
]

// Services page slides
export const servicesSlides: SlideContent[] = [
  {
    id: 'blockchain',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Блокчейн Разработка
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Смарт-контракты, DApps и индивидуальные блокчейн решения, адаптированные под ваши бизнес-потребности. 
          Мы помогаем вам использовать силу децентрализованных технологий.
        </p>
      </div>
    )
  },
  {
    id: 'webdev',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Веб-Разработка
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Современные, адаптивные веб-приложения, созданные с использованием новейших технологий. 
          От простых сайтов до сложных веб-платформ.
        </p>
      </div>
    )
  },
  {
    id: 'consulting',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Консультирование
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Стратегическое руководство по внедрению блокчейн технологий, интеграции криптовалют 
          и цифровой трансформации для вашего бизнеса.
        </p>
      </div>
    )
  }
]

// Works page slides
export const worksSlides: SlideContent[] = [
  {
    id: 'portfolio1',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Скоро
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Мы в настоящее время работаем над демонстрацией наших удивительных проектов. 
          Следите за обновлениями нашего портфолио блокчейн и веб-разработки.
        </p>
      </div>
    )
  }
]

// News page slides
export const newsSlides: SlideContent[] = [
  {
    id: 'news1',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Последние Обновления
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Следите за последними новостями и обновлениями от CryptoCat! 
          Мы всегда работаем над захватывающими новыми проектами и партнерствами.
        </p>
      </div>
    )
  }
]

// Contact page slides
export const contactSlides: SlideContent[] = [
  {
    id: 'contact-info',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '30px', textTransform: 'uppercase' }}>
          Связаться С Нами
        </h3>
        <div style={{ display: 'grid', gap: '30px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
            <h4 style={{ color: '#FF7A3D', marginBottom: '10px' }}>Email</h4>
            <a 
              href="mailto:cryptocatagency@gmail.com" 
              style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}
            >
              cryptocatagency@gmail.com
            </a>
          </div>
          <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
            <h4 style={{ color: '#FF7A3D', marginBottom: '10px' }}>Телефон</h4>
            <a 
              href="tel:+123456789" 
              style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}
            >
              (+1) 234 56 789
            </a>
          </div>
        </div>
      </div>
    )
  }
]
