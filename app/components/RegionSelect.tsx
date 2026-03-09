'use client';

// ============================================
// RegionSelect Component (Client)
// Client에서 fetch로 데이터 조회
// ============================================

import {useEffect, useState} from 'react';
import type {Region} from '@/types';
import styles from '@/app/styles/select.module.css';

interface RegionSelectProps {
  onRegionChange: (regionId: number | null) => void;
  selectedRegion: number | null;
}

export default function RegionSelect({onRegionChange, selectedRegion}: RegionSelectProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Client에서 fetch로 조회
    const fetchRegions = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/regions`);
        if (!response.ok) throw new Error('지역 조회 실패');
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error('지역 조회 에러:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = e.target.value;
    onRegionChange(regionId ? parseInt(regionId) : null); // ✅ 호출
  };

  return (
    <div className={styles.selectContainer}>
      <label htmlFor="region" className={styles.selectLabel}>
        🏢 지역 선택
      </label>
      <select
        id="region"
        onChange={handleChange}
        value={selectedRegion || ''}
        className={styles.selectInput}
        disabled={loading}
      >
        <option value="">{loading ? '로딩 중...' : '지역을 선택해주세요'}</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
    </div>
  );
}
