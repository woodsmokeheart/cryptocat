'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Service } from '@/types/service'
import ServiceCard from '../ServiceCard/ServiceCard'
import styles from './ServicesMobileAccordion.module.css'

interface ServicesMobileAccordionProps {
  services: Service[]
}

const ServicesMobileAccordion: React.FC<ServicesMobileAccordionProps> = ({ services }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.accordion}>
      {services.map((service, index) => {
        const isOpen = openIndex === index
        const contentRef = contentRefs.current[index]
        
        return (
          <div key={service.id} className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <div 
              className={styles.accordionHeader}
              onClick={() => handleToggle(index)}
            >
              <h3 className={styles.accordionTitle}>
                {service.mobile_accordion_button_text || 'Развернуть'}
              </h3>
              <button 
                className={styles.accordionButton}
                aria-label={isOpen ? 'Свернуть' : service.mobile_accordion_button_text || 'Развернуть'}
              >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            
            <div 
              className={`${styles.accordionContent} ${isOpen ? styles.contentOpen : ''}`}
              style={{
                height: isOpen && contentRef ? `${contentRef.scrollHeight}px` : '0px',
                overflow: isOpen ? 'visible' : 'hidden'
              }}
            >
              <div ref={(el) => { contentRefs.current[index] = el }} className={styles.accordionContentInner}>
                <ServiceCard service={service} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ServicesMobileAccordion

