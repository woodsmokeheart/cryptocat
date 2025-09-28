import { SlideContent } from '../types/modal'

// About page slides
export const aboutSlides: SlideContent[] = [
  {
    id: 'mission',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Our Mission
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          We are a cutting-edge digital agency specializing in blockchain technology, 
          cryptocurrency solutions, and innovative web development. Our mission is to 
          bridge the gap between traditional business and the decentralized future.
        </p>
      </div>
    )
  },
  {
    id: 'values',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Our Values
        </h3>
        <div style={{ display: 'grid', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
            <h4 style={{ color: '#FF7A3D', marginBottom: '10px' }}>Innovation</h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              We stay at the forefront of technology, constantly exploring new possibilities in blockchain and web development.
            </p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
            <h4 style={{ color: '#FF7A3D', marginBottom: '10px' }}>Transparency</h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              We believe in open communication and transparent processes throughout every project.
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
          Our Team
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Our diverse team of blockchain experts, developers, and designers work together 
          to deliver exceptional results. We combine technical expertise with creative 
          vision to bring your ideas to life.
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
          Blockchain Development
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Smart contracts, DApps, and custom blockchain solutions tailored to your business needs. 
          We help you leverage the power of decentralized technology.
        </p>
      </div>
    )
  },
  {
    id: 'webdev',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Web Development
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Modern, responsive web applications built with the latest technologies. 
          From simple websites to complex web platforms.
        </p>
      </div>
    )
  },
  {
    id: 'consulting',
    content: (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <h3 style={{ color: '#FF7A3D', fontSize: '2rem', marginBottom: '20px', textTransform: 'uppercase' }}>
          Consulting
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Strategic guidance on blockchain implementation, cryptocurrency integration, 
          and digital transformation for your business.
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
          Coming Soon
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          We&apos;re currently working on showcasing our amazing projects. 
          Stay tuned for our portfolio of blockchain and web development projects.
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
          Latest Updates
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          Stay tuned for the latest news and updates from CryptoCat! 
          We&apos;re always working on exciting new projects and partnerships.
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
          Get In Touch
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
            <h4 style={{ color: '#FF7A3D', marginBottom: '10px' }}>Phone</h4>
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
