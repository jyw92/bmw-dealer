'use client';

import styles from '@/app/styles/form.module.css';
import RegionSelect from './RegionSelect';
import {useState} from 'react';
import {Vehicle} from '@/types';
import DealerSelect from './DealerSelect';

export default function CorporateForm() {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<number | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <form action="">
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1단계: 지역 및 딜러사 선택</h2>
        <RegionSelect selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        <DealerSelect regionId={selectedRegion} selectedDealer={selectedDealer} onDealerChange={setSelectedDealer} />
      </section>
    </form>
  );
}
