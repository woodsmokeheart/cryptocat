export interface PaginationItem {
  type: 'page' | 'ellipsis'
  value: number
  label: string
}

/**
 * Генерирует умную пагинацию с многоточием
 * Показывает: [1] [...] [текущая-2] [текущая-1] [текущая] [текущая+1] [текущая+2] [...] [последняя]
 */
export function generateSmartPagination(
  currentPage: number,
  totalPages: number,
  maxVisiblePages = 3
): PaginationItem[] {
  if (totalPages <= 1) return []
  if (totalPages <= 2) {
    // Если страниц очень мало (1-2), показываем все
    return Array.from({ length: totalPages }, (_, i) => ({
      type: 'page' as const,
      value: i + 1,
      label: (i + 1).toString(),
    }))
  }

  const items: PaginationItem[] = []
  const halfVisible = Math.floor(maxVisiblePages / 2)

  // Всегда показываем первую страницу
  items.push({
    type: 'page',
    value: 1,
    label: '1',
  })

  // Определяем диапазон страниц вокруг текущей
  let startPage = Math.max(2, currentPage - halfVisible)
  let endPage = Math.min(totalPages - 1, currentPage + halfVisible)

  // Корректируем диапазон, если мы близко к началу или концу
  if (currentPage <= halfVisible + 1) {
    endPage = Math.min(totalPages - 1, maxVisiblePages - 1)
  }
  if (currentPage >= totalPages - halfVisible) {
    startPage = Math.max(2, totalPages - maxVisiblePages + 2)
  }

  // Добавляем многоточие после первой страницы, если нужно
  if (startPage > 2) {
    items.push({
      type: 'ellipsis',
      value: 0,
      label: '...',
    })
  }

  // Добавляем страницы в диапазоне
  for (let i = startPage; i <= endPage; i++) {
    items.push({
      type: 'page',
      value: i,
      label: i.toString(),
    })
  }

  // Добавляем многоточие перед последней страницей, если нужно
  if (endPage < totalPages - 1) {
    items.push({
      type: 'ellipsis',
      value: 0,
      label: '...',
    })
  }

  // Всегда показываем последнюю страницу (если она не первая)
  if (totalPages > 1) {
    items.push({
      type: 'page',
      value: totalPages,
      label: totalPages.toString(),
    })
  }

  return items
}
