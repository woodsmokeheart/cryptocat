'use client'

import React from 'react'
import { useModal } from '../../hooks/useModal'
import AboutModal from '../AboutModal/AboutModal'
import ContactModal from '../ContactModal/ContactModal'
import FaqModal from '../FaqModal/FaqModal'
import ServicesModal from '../ServicesModal/ServicesModal'

const ModalManager: React.FC = () => {
  const aboutModal = useModal('about')
  const servicesModal = useModal('services')
  const faqModal = useModal('faq')
  const contactModal = useModal('contact')

  return (
    <>
      <AboutModal
        isOpen={aboutModal.isOpen}
        onClose={aboutModal.closeModal}
      />

      <ServicesModal 
        isOpen={servicesModal.isOpen} 
        onClose={servicesModal.closeModal}
      />

      <FaqModal 
        isOpen={faqModal.isOpen} 
        onClose={faqModal.closeModal}
      />

      <ContactModal 
        isOpen={contactModal.isOpen} 
        onClose={contactModal.closeModal}
      />
    </>
  )
}

export default ModalManager
