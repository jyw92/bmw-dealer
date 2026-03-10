import styles from '@/app/styles/vehicle.module.css';
import {Vehicle} from '@/types';
import {useEffect, useState} from 'react';
import VehicleCard from './VehicleCard';

interface VehicleListProps {
  dealerId: number | null;
  selectedVehicle?: Vehicle | null;
  onVehicleSelect?: (vehicle: Vehicle | null) => void;
}

export default function VehicleList({dealerId, selectedVehicle, onVehicleSelect}: VehicleListProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dealerId) {
      setVehicles([]);
      return;
    }

    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/vehicles?dealerId=${dealerId}`);
        if (!response.ok) throw new Error('차량 조회 실패');
        const data = await response.json();
        setVehicles(data);
        // console.log(JSON.stringify(data), null, 2);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [dealerId]);

  if (!dealerId) {
    return <div className={styles.placeholderMessage}>딜러사를 먼저 선택해주세요.</div>;
  }

  if (loading) {
    return <div className={styles.loadingMessage}>차량 목록을 불러오는 중...</div>;
  }

  return (
    <div>
      <h2 className={styles.vehicleListTitle}>🚗 보유 차량 {vehicles.length}대</h2>
      <div className={styles.vehicleGrid}>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isSelected={selectedVehicle?.id === vehicle.id}
              onSelect={() => onVehicleSelect && onVehicleSelect(vehicle)}
            />
          ))
        ) : (
          <div className={styles.emptyMessage}>이 딜러사의 차량이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
