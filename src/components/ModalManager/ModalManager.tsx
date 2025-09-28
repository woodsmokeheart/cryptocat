'use client'

import React from 'react'
import ModalLayout from '../ModalLayout/ModalLayout'
import { useModal } from '../../hooks/useModal'
import { 
  aboutSlides, 
  servicesSlides, 
  worksSlides, 
  newsSlides, 
  contactSlides 
} from '../../data/modalSlides'

const ModalManager: React.FC = () => {
  const aboutModal = useModal('about')
  const servicesModal = useModal('services')
  const worksModal = useModal('works')
  const newsModal = useModal('news')
  const contactModal = useModal('contact')

  return (
    <>
      <ModalLayout 
        isOpen={aboutModal.isOpen} 
        onClose={aboutModal.closeModal}
        title="ABOUT CRYPTOCAT"
        description="Discover our mission, values, and the team behind CryptoCat's innovative blockchain solutions."
        slides={aboutSlides}
      />

      <ModalLayout 
        isOpen={servicesModal.isOpen} 
        onClose={servicesModal.closeModal}
        title="OUR SERVICES"
        description="Explore our comprehensive range of blockchain development, web solutions, and consulting services."
        slides={servicesSlides}
      />

      <ModalLayout 
        isOpen={worksModal.isOpen} 
        onClose={worksModal.closeModal}
        title="OUR WORKS"
        description="Take a look at our portfolio of successful blockchain and web development projects."
        slides={worksSlides}
      />

      <ModalLayout 
        isOpen={newsModal.isOpen} 
        onClose={newsModal.closeModal}
        title="LATEST NEWS"
        description="Stay updated with the latest news, announcements, and insights from the CryptoCat team."
        slides={newsSlides}
      />

      <ModalLayout 
        isOpen={contactModal.isOpen} 
        onClose={contactModal.closeModal}
        title="CONTACT US"
        description="Ready to start your blockchain journey? Get in touch with our team of experts."
        slides={contactSlides}
      />
    </>
  )
}

export default ModalManager
