import styles from '@/app/styles/vehicle.module.css';
import {Vehicle} from '@/types';
import {useEffect, useState} from 'react';

interface VehicleListProps {
  dealerId: number | null;
  onVehicleSelect: (vehicle: Vehicle | null) => void;
  selectedVehicle: Vehicle | null;
}

export default function VehicleList({dealerId, onVehicleSelect, selectedVehicle}: VehicleListProps) {
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
      } catch (error) {}
    };
  }, [dealerId]);

  return (
    <div>
      <h2 className={styles.vehicleListTitle}>🚗 보유 차량{}대</h2>
      <div className={styles.vehicleGrid}></div>
    </div>
  );
}
