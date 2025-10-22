'use client'

import React from 'react'
import ModalLayout from '../ModalLayout/ModalLayout'
import { useModal } from '../../hooks/useModal'
import { 
  aboutSlides, 
  servicesSlides, 
  faqSlides, 
  contactSlides 
} from '../../data/modalSlides'

const ModalManager: React.FC = () => {
  const aboutModal = useModal('about')
  const servicesModal = useModal('services')
  const faqModal = useModal('faq')
  const contactModal = useModal('contact')

  return (
    <>
      <ModalLayout 
        isOpen={aboutModal.isOpen} 
        onClose={aboutModal.closeModal}
        title="О CRYPTOCAT"
        description="Узнайте о нашей миссии, ценностях и команде, стоящей за инновационными блокчейн решениями CryptoCat."
        slides={aboutSlides}
      />

      <ModalLayout 
        isOpen={servicesModal.isOpen} 
        onClose={servicesModal.closeModal}
        title="НАШИ УСЛУГИ"
        description="Изучите наш полный спектр услуг по разработке блокчейн решений, веб-разработке и консультированию."
        slides={servicesSlides}
      />


      <ModalLayout 
        isOpen={faqModal.isOpen} 
        onClose={faqModal.closeModal}
        title="FAQ"
        description="Ответы на часто задаваемые вопросы о работе с Crypto Cat и торговле на криптовалютных биржах."
        slides={faqSlides}
      />

      <ModalLayout 
        isOpen={contactModal.isOpen} 
        onClose={contactModal.closeModal}
        title="СВЯЗАТЬСЯ С НАМИ"
        description="Официальные каналы связи команды CryptoCat. Мы работаем только через проверенные контакты - остерегайтесь мошенников."
        slides={contactSlides}
      />
    </>
  )
}

export default ModalManager
