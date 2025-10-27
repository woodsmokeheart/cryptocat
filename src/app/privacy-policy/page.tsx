import { redirect } from 'next/navigation'
import { getLegalPage } from '@/lib/legal-pages'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage('privacy_policy')

  if (!page) {
    redirect('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{page.title || 'Privacy Policy'}</h1>
        <div 
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  )
}

