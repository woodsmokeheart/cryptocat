'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  containerId?: string
}

const Portal: React.FC<PortalProps> = ({ children, containerId = 'modal-root' }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let element = document.getElementById(containerId)
    
    if (!element) {
      element = document.createElement('div')
      element.id = containerId
      element.style.position = 'fixed'
      element.style.top = '0'
      element.style.left = '0'
      element.style.width = '100%'
      element.style.height = '100%'
      element.style.pointerEvents = 'none'
      element.style.zIndex = '9999'
      document.body.appendChild(element)
    }
    
    setContainer(element)
    
    return () => {
      const existingElement = document.getElementById(containerId)
      if (existingElement && existingElement.children.length === 0) {
        document.body.removeChild(existingElement)
      }
    }
  }, [containerId])

  if (!container) return null

  return createPortal(children, container)
}

export default Portal
