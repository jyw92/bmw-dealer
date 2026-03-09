'use client';

// ============================================
// AgreementCheckbox Component (Client)
// 약관 동의
// ============================================

import styles from '@/app/styles/agreement.module.css';

interface AgreementData {
  agreePersonal: boolean;
  agreeMarketing: boolean;
  agreeTerms: boolean;
}

interface AgreementCheckboxProps {
  agreements: AgreementData;
  onChange: (data: AgreementData) => void;
}

export default function AgreementCheckbox({agreements, onChange}: AgreementCheckboxProps) {
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    onChange({
      ...agreements,
      [name]: checked,
    });
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>📋 약관 동의</h2>

      {/* 개인정보 처리 동의 (필수) */}
      <div className={styles.checkboxContainer}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="agreePersonal"
            checked={agreements.agreePersonal}
            onChange={handleCheckChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>
            개인정보 처리동의
            <span className={styles.requiredBadge}>(필수)</span>
          </span>
        </label>
        <p className={styles.checkboxDescription}>개인정보 수집, 이용에 동의합니다.</p>
      </div>

      {/* 마케팅 정보 수신 동의 (선택) */}
      <div className={styles.checkboxContainer}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="agreeMarketing"
            checked={agreements.agreeMarketing}
            onChange={handleCheckChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>
            마케팅 정보 수신 동의
            <span className={styles.optionalBadge}>(선택)</span>
          </span>
        </label>
        <p className={styles.checkboxDescription}>신차 출시, 이벤트, 혜택 정보를 받으시겠습니까?</p>
      </div>

      {/* 이용약관 동의 (필수) */}
      <div className={styles.checkboxContainer}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={agreements.agreeTerms}
            onChange={handleCheckChange}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>
            이용약관 동의
            <span className={styles.requiredBadge}>(필수)</span>
          </span>
        </label>
        <p className={styles.checkboxDescription}>서비스 이용약관에 동의합니다.</p>
      </div>

      {/* 동의 검증 메시지 */}
      {(!agreements.agreePersonal || !agreements.agreeTerms) && (
        <div className={styles.warningBox}>⚠️ 필수 약관에 동의해주세요.</div>
      )}
    </div>
  );
}
