'use client';

import styles from '@/app/styles/form.module.css';
import RegionSelect from './RegionSelect';
import {useState} from 'react';
import {AgreementData, CustomerFormData, Vehicle} from '@/types';
import DealerSelect from './DealerSelect';
import VehicleList from './VehicleList';
import AgreementCheckbox from './AgreementCheckbox';
import CustomerForm from './CustomerForm';
import toast from 'react-hot-toast';
import {submitApplicationAction} from '../actions/application';

const INITIAL_FORM: CustomerFormData = {
  companyNumber: '',
  companyName: '',
  name: '',
  phone: '',
};

const INITIAL_AGREEMENTS: AgreementData = {
  agreePersonal: false,
  agreeMarketing: false,
  agreeTerms: false,
};

export default function CorporateForm() {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<number | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<CustomerFormData>(INITIAL_FORM);
  const [agreements, setAgreements] = useState<AgreementData>(INITIAL_AGREEMENTS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetAllFields = () => {
    setSelectedRegion(null);
    setSelectedDealer(null);
    setSelectedVehicle(null);
    setFormData(INITIAL_FORM);
    setAgreements(INITIAL_AGREEMENTS);
    toast.success('모든 내용이 초기화되었습니다.');
  };

  const validateForm = (): boolean => {
    if (!selectedVehicle) {
      toast.error('차량을 선택해주세요.');
      return false;
    }
    const {companyNumber, companyName, name, phone} = formData;
    if (!companyNumber || !companyName || !name || !phone) {
      toast.error('모든 고객 정보를 입력해주세요.');
      return false;
    }
    // 필수 약관인 개인정보(agreePersonal)와 이용약관(agreeTerms)만 체크
    if (!agreements.agreePersonal || !agreements.agreeTerms) {
      toast.error('필수 약관에 동의해주세요.');
      return false;
    }
    return true; // ✨ 성공 시 true 반환!
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading('데이터를 전송 중입니다...');

    try {
      const combinedData = {
        ...formData,
        ...agreements,
        vehicleId: selectedVehicle?.id,
        dealerId: selectedDealer,
      };

      const formDataObj = new FormData();
      Object.entries(combinedData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataObj.append(key, value.toString());
        }
      });

      const result = await submitApplicationAction(undefined, formDataObj);

      if (result.status) {
        toast.success('신청이 성공적으로 완료되었습니다!', {id: loadingToast});
        resetAllFields();
      } else {
        toast.error(result.message || '제출에 실패했습니다.', {id: loadingToast});
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('서버 오류가 발생했습니다.', {id: loadingToast});
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✨ return문은 handleSubmit 함수 "바깥"에 위치해야 합니다!
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* 1단계: 지역 및 딜러사 선택 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1단계: 지역 및 딜러사 선택</h2>
        <RegionSelect selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        <DealerSelect regionId={selectedRegion} selectedDealer={selectedDealer} onDealerChange={setSelectedDealer} />
      </section>

      {/* 2단계: 차량 선택 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2단계: 차량 선택</h2>
        <VehicleList dealerId={selectedDealer} selectedVehicle={selectedVehicle} onVehicleSelect={setSelectedVehicle} />
        {selectedVehicle && (
          <div className={styles.selectedVehicle}>
            <p className={styles.selectedVehicleTitle}>✓ 선택된 차량: {selectedVehicle.model}</p>
          </div>
        )}
      </section>

      {/* 3단계: 고객 정보 입력 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3단계: 고객 정보 입력</h2>
        <CustomerForm formData={formData} onChangeHandler={setFormData} />
      </section>

      {/* 4단계: 약관 동의 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4단계: 약관 동의</h2>
        <AgreementCheckbox agreements={agreements} onChangeHandler={setAgreements} />
      </section>

      {/* 전송버튼 */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonReset}`}
          onClick={resetAllFields} // ✨ 클릭 이벤트 연결
        >
          초기화
        </button>
        <button type="submit" disabled={isSubmitting} className={`${styles.button} ${styles.buttonSubmit}`}>
          {isSubmitting ? '처리 중...' : '신청하기'}
        </button>
      </div>
    </form>
  );
}
