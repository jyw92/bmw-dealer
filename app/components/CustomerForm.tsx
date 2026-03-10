'use client';

// ============================================
// CustomerForm Component (Client)
// 고객 정보 입력
// ============================================

import styles from '@/app/styles/form.module.css';

interface CustomerFormData {
  companyNumber: string;
  companyName: string;
  name: string;
  phone: string;
}

interface CustomerFormProps {
  formData: CustomerFormData;
  onChangeHandler: (data: CustomerFormData) => void;
}

export default function CustomerForm({formData, onChangeHandler}: CustomerFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    onChangeHandler({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>👤 법인 고객 정보 입력</h2>

      {/* 사업자번호 */}
      <div className={styles.formGroup}>
        <label htmlFor="companyNumber" className={styles.label}>
          사업자번호 <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="companyNumber"
          name="companyNumber"
          placeholder="예: 123-45-67890"
          value={formData.companyNumber}
          onChange={handleInputChange}
          className={styles.input}
        />
        <small className={styles.helper}>하이픈 포함하여 입력해주세요</small>
      </div>

      {/* 회사명 */}
      <div className={styles.formGroup}>
        <label htmlFor="companyName" className={styles.label}>
          회사명 <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="예: ㅇㅇ 자동차 회사"
          value={formData.companyName}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>

      {/* 담당자 이름 */}
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          담당자 이름 <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="예: 김철수"
          value={formData.name}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>

      {/* 휴대폰 번호 */}
      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          휴대폰번호 <span className={styles.required}>*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="예: 010-1234-5678"
          value={formData.phone}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
