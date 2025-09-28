'use client'

import React from 'react'
import ModalLayout from '../ModalLayout/ModalLayout'
import { useModal } from '../../hooks/useModal'
import { 
  aboutSlides, 
  servicesSlides, 
  newsSlides, 
  contactSlides 
} from '../../data/modalSlides'

const ModalManager: React.FC = () => {
  const aboutModal = useModal('about')
  const servicesModal = useModal('services')
  const newsModal = useModal('news')
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
        isOpen={newsModal.isOpen} 
        onClose={newsModal.closeModal}
        title="ПОСЛЕДНИЕ НОВОСТИ"
        description="Будьте в курсе последних новостей, объявлений и инсайтов от команды CryptoCat."
        slides={newsSlides}
      />

      <ModalLayout 
        isOpen={contactModal.isOpen} 
        onClose={contactModal.closeModal}
        title="СВЯЗАТЬСЯ С НАМИ"
        description="Готовы начать свой блокчейн путь? Свяжитесь с нашей командой экспертов."
        slides={contactSlides}
      />
    </>
  )
}

export default ModalManager
