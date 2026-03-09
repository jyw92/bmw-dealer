'use client';

// ============================================
// RegionSelect Component (Client)
// Client에서 fetch로 데이터 조회
// ============================================

import styles from '@/app/styles/select.module.css';
import {Region} from '@/types';
import {useEffect, useState} from 'react';

interface RegionSelectProps {
  setSelectedRegion: (regionId: number | null) => void;
  selectedRegion: number | null;
}

export default function RegionSelect({selectedRegion, setSelectedRegion}: RegionSelectProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/regions`);
        if (!response.ok) throw new Error('지역 조회 실패');
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error('지역 조회 에러', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = e.target.value;
    setSelectedRegion(regionId ? parseInt(regionId) : null);
  };

  return (
    <div className={styles.selectContainer}>
      <label htmlFor="region" className={styles.selectLabel}>
        🏢 지역 선택
      </label>
      <select
        id="region"
        className={styles.selectInput}
        disabled={loading}
        value={selectedRegion || ''}
        onChange={handleChange}
      >
        <option value="">{loading ? '로딩 중...' : '지역을 선택해주세요.'}</option>
        {regions.map((region) => (
          <option value={region.id} key={region.id}>
            {region.name}
          </option>
        ))}
      </select>
    </div>
  );
}
