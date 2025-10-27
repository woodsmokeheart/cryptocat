import { redirect } from 'next/navigation'
import { getLegalPage } from '@/lib/legal-pages'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function TermsOfUsePage() {
  const page = await getLegalPage('terms_of_use')

  if (!page) {
    redirect('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{page.title || 'Terms of Use'}</h1>
        <div 
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  )
}

