'use client';

// ============================================
// ApplicationForm Component (Client)
// 신청시 Server Action으로 FormData 전송
// ============================================

import {useState} from 'react';
import {submitApplicationAction} from '@/app/actions/application';
import type {Vehicle} from '@/types';
import RegionSelect from './RegionSelect';
import DealerSelect from './DealerSelect';
import VehicleList from './VehicleList';
import CustomerForm from './CustomerForm';
import AgreementCheckbox from './AgreementCheckbox';
import styles from '@/app/styles/form.module.css';

interface CustomerFormData {
  companyNumber: string;
  companyName: string;
  name: string;
  phone: string;
}

interface AgreementData {
  agreePersonal: boolean;
  agreeMarketing: boolean;
  agreeTerms: boolean;
}

export default function ApplicationForm() {
  console.log('🚨 ApplicationForm 실행 위치 확인 🚨');
  // 선택 상태
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<number | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // 폼 데이터
  const [formData, setFormData] = useState<CustomerFormData>({
    companyNumber: '',
    companyName: '',
    name: '',
    phone: '',
  });

  // 약관 동의
  const [agreements, setAgreements] = useState<AgreementData>({
    agreePersonal: false,
    agreeMarketing: false,
    agreeTerms: false,
  });

  // 제출 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // 유효성 검사
  const validateForm = (): boolean => {
    if (!selectedVehicle) {
      alert('차량을 선택해주세요');
      return false;
    }

    if (!formData.companyNumber || !formData.companyName || !formData.name || !formData.phone) {
      alert('모든 고객 정보를 입력해주세요');
      return false;
    }

    if (!agreements.agreePersonal || !agreements.agreeTerms) {
      alert('필수 약관에 동의해주세요');
      return false;
    }

    return true;
  };

  // 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // FormData 생성
      const formDataObj = new FormData();
      formDataObj.append('vehicleId', selectedVehicle!.id.toString());
      formDataObj.append('dealerId', selectedDealer!.toString());
      formDataObj.append('companyNumber', formData.companyNumber);
      formDataObj.append('companyName', formData.companyName);
      formDataObj.append('name', formData.name);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('agreePersonal', agreements.agreePersonal.toString());
      formDataObj.append('agreeMarketing', agreements.agreeMarketing.toString());
      formDataObj.append('agreeTerms', agreements.agreeTerms.toString());

      // Server Action 호출
      const result = await submitApplicationAction(undefined, formDataObj);

      if (result.status) {
        setSubmitStatus('success');

        // 2초 후 초기화
        setTimeout(() => {
          setSelectedRegion(null);
          setSelectedDealer(null);
          setSelectedVehicle(null);
          setFormData({
            companyNumber: '',
            companyName: '',
            name: '',
            phone: '',
          });
          setAgreements({
            agreePersonal: false,
            agreeMarketing: false,
            agreeTerms: false,
          });
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('오류:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 초기화
  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedDealer(null);
    setSelectedVehicle(null);
    setFormData({
      companyNumber: '',
      companyName: '',
      name: '',
      phone: '',
    });
    setAgreements({
      agreePersonal: false,
      agreeMarketing: false,
      agreeTerms: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 1단계: 지역 및 딜러사 선택 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1단계: 지역 및 딜러사 선택</h2>
        <RegionSelect selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
        <DealerSelect regionId={selectedRegion} selectedDealer={selectedDealer} onDealerChange={setSelectedDealer} />
      </section>

      {/* 2단계: 차량 선택 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2단계: 차량 선택</h2>
        <VehicleList dealerId={selectedDealer} selectedVehicle={selectedVehicle} onVehicleSelect={setSelectedVehicle} />
        {selectedVehicle && (
          <div className={styles.selectedVehicle}>
            <p className={styles.selectedVehicleTitle}>✓ 선택된 차량:</p>
            <p>
              {selectedVehicle.model} ({selectedVehicle.year}년식)
            </p>
          </div>
        )}
      </section>

      {/* 3단계: 고객 정보 입력 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3단계: 고객 정보 입력</h2>
        <CustomerForm formData={formData} onChange={setFormData} />
      </section>

      {/* 4단계: 약관 동의 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4단계: 약관 동의</h2>
        <AgreementCheckbox agreements={agreements} onChange={setAgreements} />
      </section>

      {/* 제출 상태 메시지 */}
      {submitStatus === 'success' && (
        <div className={styles.successMessage}>
          <strong>✓ 신청이 완료되었습니다!</strong>
          <p>담당자가 곧 연락드리겠습니다.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className={styles.errorMessage}>
          <strong>✗ 신청 처리 중 오류가 발생했습니다.</strong>
          <p>다시 시도해주세요.</p>
        </div>
      )}

      {/* 버튼 */}
      <div className={styles.buttonGroup}>
        <button type="button" onClick={handleReset} className={`${styles.button} ${styles.buttonReset}`}>
          초기화
        </button>
        <button type="submit" disabled={isSubmitting} className={`${styles.button} ${styles.buttonSubmit}`}>
          {isSubmitting ? '처리 중...' : '신청하기'}
        </button>
      </div>
    </form>
  );
}
