// ============================================
// Page Component (Server)
// 메인 페이지
// ============================================

import type {Metadata} from 'next';
import ApplicationForm from '@/app/components/ApplicationForm';
import styles from './styles/page.module.css';

export const metadata: Metadata = {
  title: 'BMW 딜러사 - 법인고객 신청',
  description: '법인 고객을 위한 BMW 프리미엄 차량 신청 시스템',
};

export default function Home() {
  return (
    <main className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>🚗 BMW 딜러사</h1>
        <p className={styles.headerSubtitle}>법인 고객을 위한 프리미엄 차량 신청 시스템</p>
      </div>

      {/* 메인 컨텐츠 */}
      <div className={styles.main}>
        <ApplicationForm />
      </div>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <p>© 2024 BMW Korea. All rights reserved.</p>
      </footer>
    </main>
  );
}
