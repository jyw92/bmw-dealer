// ============================================
// VehicleCard Component (Client)
// 개별 차량 카드
// ============================================

"use client";

import type { Vehicle } from "@/types";
import styles from "@/app/styles/vehicle.module.css";

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onSelect: () => void;
}

export default function VehicleCard({
  vehicle,
  isSelected,
  onSelect,
}: VehicleCardProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`${styles.vehicleCard} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      {/* 차량 이미지 */}
      <div className={styles.vehicleImage}>
        <img
          src={vehicle.image}
          alt={vehicle.model}
          className={styles.vehicleImageTag}
        />
        {isSelected && <div className={styles.selectedBadge}>✓ 선택됨</div>}
      </div>

      {/* 차량 정보 */}
      <div className={styles.vehicleInfo}>
        <h3 className={styles.vehicleTitle}>{vehicle.model}</h3>
        <p className={styles.vehicleSpecs}>
          {vehicle.year}년식 • {vehicle.engine}
        </p>
        <p className={styles.vehicleDescription}>{vehicle.description}</p>

        {/* 가격 */}
        <div className={styles.priceBox}>
          <p className={styles.price}>{formatPrice(vehicle.price)}</p>
        </div>
      </div>
    </div>
  );
}
