'use client'

import React from 'react'
import ContentCard from '../ContentCard/ContentCard'
import { newsData } from '../../data/newsData'
import styles from './NewsGrid.module.css'

const NewsGrid: React.FC = () => {
  // Компонент сетки новостей
  return (
    <div className={styles.newsGridContainer}>
      <div className={styles.newsGrid}>
        {newsData.map((news) => (
          <ContentCard
            key={news.id}
            id={news.id}
            image={news.image}
            title={news.title}
            description={news.description}
            date={news.date}
            type="news"
            onReadMore={() => {
              // Здесь можно добавить логику для открытия полной новости
              console.log('Читать новость:', news.title)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsGrid
