'use client';

import styles from '@/app/styles/agreement.module.css';
import {AgreementData} from '@/types';

interface AgreementCheckboxProps {
  agreements: AgreementData;
  onChangeHandler: (data: AgreementData) => void;
}

export default function AgreementCheckbox({agreements, onChangeHandler}: AgreementCheckboxProps) {
  // 1. 모든 항목이 체크되었는지 계산 (전체 동의 상태)
  const isAllChecked = Object.values(agreements).every((val) => val === true);

  // 2. 전체 동의 클릭 핸들러
  const handleAllCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {checked} = e.target;
    // 모든 항목을 전체 동의 체크 여부(T/F)와 동일하게 맞춤
    onChangeHandler({
      agreePersonal: checked,
      agreeMarketing: checked,
      agreeTerms: checked,
    });
  };

  // 3. 개별 항목 클릭 핸들러 (기존과 동일)
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    onChangeHandler({
      ...agreements,
      [name]: checked,
    });
  };

  return (
    <div className={styles.agreementSection}>
      <h2 className={styles.sectionTitle}>📋 약관 동의</h2>

      {/* 🌟 전체 동의 섹션 (상단에 배치) */}
      <div className={`${styles.checkboxContainer} ${styles.allCheckContainer}`}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={handleAllCheckChange}
            className={styles.checkboxInput}
          />
          <span className={`${styles.checkboxText} ${styles.allCheckText}`}>전체 동의하기</span>
        </label>
        <p className={styles.checkboxDescription}>
          이용약관, 개인정보 수집 및 이용, 마케팅 정보 수신(선택)에 모두 동의합니다.
        </p>
      </div>

      <hr className={styles.divider} />

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
            개인정보 처리동의 <span className={styles.requiredBadge}>(필수)</span>
          </span>
        </label>
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
            이용약관 동의 <span className={styles.requiredBadge}>(필수)</span>
          </span>
        </label>
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
            마케팅 정보 수신 동의 <span className={styles.optionalBadge}>(선택)</span>
          </span>
        </label>
      </div>

      {/* 동의 검증 메시지 */}
      {(!agreements.agreePersonal || !agreements.agreeTerms) && (
        <div className={styles.warningBox}>⚠️ 필수 약관에 동의해주세요.</div>
      )}
    </div>
  );
}
