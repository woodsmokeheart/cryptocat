import { ReactNode } from 'react'
import { 
  bingxContent, 
  chatContent, 
  referralContent, 
  algorithmContent 
} from '../content/faq'

export interface FaqItem {
  id: number
  slug: string
  image: string
  title: string
  description: string
  date: string
  content: ReactNode
}

export const faqData: FaqItem[] = [
  {
    id: 1,
    slug: "bingx",
    image: "/img/news/1.jpeg",
    title: "Почему мы выбираем Bingx",
    description: "Выбор криптовалютной биржи - это не просто технический момент, а ключевая составляющая успеха в торговле.",
    date: "15 декабря 2024",
    content: bingxContent
  },
  {
    id: 2,
    slug: "chat",
    image: "/img/news/3.jpeg",
    title: "Общий чат Crypto Cat",
    description: "Друзья, мы напоминаем, что у каждого из вас есть возможность попасть в наш общий чат Crypto Cat.",
    date: "12 декабря 2024",
    content: chatContent
  },
  {
    id: 3,
    slug: "guide",
    image: "/img/news/2.jpeg",
    title: "Гайд по переводу аккаунта на рефеальную ссылку Crypto Cat",
    description: "Инструкция по переводу уже существующего аккаунта на нашу реферальную ссылку.",
    date: "10 декабря 2024",
    content: referralContent
  },
  {
    id: 4,
    slug: "algorithm",
    image: "/img/news/4.jpg",
    title: "Торговый алгоритм на всю жизнь",
    description: "Каждый трейдер ищет то что поможет ему торговать успешно. Мы с гордостью представляем вам наш торговый алгоритм которые поможет сохранить и преумножить ваш депозит.",
    date: "8 декабря 2024",
    content: algorithmContent
  }
]
