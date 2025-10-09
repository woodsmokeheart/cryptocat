import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
}

interface UseTypewriterReturn {
  displayedText: string
  isComplete: boolean
}

export const useTypewriter = ({ 
  text, 
  speed = 50, 
  delay = 0 
}: UseTypewriterOptions): UseTypewriterReturn => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Reset state
    setDisplayedText('')
    setIsComplete(false)
    indexRef.current = 0

    if (!text) return

    // Start typing after delay
    const startTyping = () => {
      const typeNextChar = () => {
        if (indexRef.current < text.length) {
          setDisplayedText(text.substring(0, indexRef.current + 1))
          indexRef.current += 1
          timeoutRef.current = setTimeout(typeNextChar, speed)
        } else {
          setIsComplete(true)
        }
      }

      timeoutRef.current = setTimeout(typeNextChar, delay)
    }

    startTyping()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, speed, delay])

  return { displayedText, isComplete }
}

