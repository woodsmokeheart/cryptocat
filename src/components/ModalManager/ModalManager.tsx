'use client'

import React from 'react'
import ModalLayout from '../ModalLayout/ModalLayout'
import { useModal } from '../../hooks/useModal'
import ServicesGrid from '../ServicesGrid/ServicesGrid'
import { faqSlides } from '../../data/modalSlides'
import AboutModal from '../AboutModal/AboutModal'
import ContactModal from '../ContactModal/ContactModal'

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

      <ModalLayout 
        isOpen={servicesModal.isOpen} 
        onClose={servicesModal.closeModal}
        title="НАШИ УСЛУГИ"
        description="Изучите наш полный спектр услуг по разработке блокчейн решений, веб-разработке и консультированию."
        servicesGrid={<ServicesGrid />}
      />


      <ModalLayout 
        isOpen={faqModal.isOpen} 
        onClose={faqModal.closeModal}
        title="FAQ"
        description="Ответы на часто задаваемые вопросы о работе с Crypto Cat и торговле на криптовалютных биржах."
        slides={faqSlides}
      />

      <ContactModal 
        isOpen={contactModal.isOpen} 
        onClose={contactModal.closeModal}
      />
    </>
  )
}

export default ModalManager
