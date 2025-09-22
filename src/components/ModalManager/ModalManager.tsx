'use client'

import React from 'react'
import Modal from '../Modal/Modal'
import AboutPage from '../pages/AboutPage'
import ServicesPage from '../pages/ServicesPage'
import { useModal } from '../../hooks/useModal'

const ModalManager: React.FC = () => {
  const aboutModal = useModal('about')
  const servicesModal = useModal('services')
  const worksModal = useModal('works')
  const newsModal = useModal('news')
  const contactModal = useModal('contact')

  return (
    <>
      <Modal 
        isOpen={aboutModal.isOpen} 
        onClose={aboutModal.closeModal}
        title="About Us"
      >
        <AboutPage />
      </Modal>

      <Modal 
        isOpen={servicesModal.isOpen} 
        onClose={servicesModal.closeModal}
        title="Our Services"
      >
        <ServicesPage />
      </Modal>

      <Modal 
        isOpen={worksModal.isOpen} 
        onClose={worksModal.closeModal}
        title="Our Works"
      >
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#FF7A3D', marginBottom: '1rem' }}>Our Portfolio</h2>
          <p style={{ color: '#ccc' }}>Coming soon! We&apos;re working on showcasing our amazing projects.</p>
        </div>
      </Modal>

      <Modal 
        isOpen={newsModal.isOpen} 
        onClose={newsModal.closeModal}
        title="Latest News"
      >
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#FF7A3D', marginBottom: '1rem' }}>News & Updates</h2>
          <p style={{ color: '#ccc' }}>Stay tuned for the latest news and updates from CryptoCat!</p>
        </div>
      </Modal>

      <Modal 
        isOpen={contactModal.isOpen} 
        onClose={contactModal.closeModal}
        title="Contact Us"
      >
        <div style={{ padding: '2rem' }}>
          <h2 style={{ color: '#FF7A3D', marginBottom: '2rem', textAlign: 'center' }}>Get In Touch</h2>
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Email</h3>
              <a 
                href="mailto:cryptocatagency@gmail.com" 
                style={{ color: '#FF7A3D', textDecoration: 'none', fontSize: '1.1rem' }}
              >
                cryptocatagency@gmail.com
              </a>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Phone</h3>
              <a 
                href="tel:+123456789" 
                style={{ color: '#FF7A3D', textDecoration: 'none', fontSize: '1.1rem' }}
              >
                (+1) 234 56 789
              </a>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Social Media</h3>
              <p style={{ color: '#ccc' }}>Follow us on our social channels for updates</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalManager
