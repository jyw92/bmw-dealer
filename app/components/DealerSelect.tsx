// ============================================
// DealerSelect Component (Client)
// Client에서 fetch로 조회
// ============================================

"use client";

import { useEffect, useState } from "react";
import type { Dealer } from "@/types";
import styles from "@/app/styles/select.module.css";

interface DealerSelectProps {
  regionId: number | null;
  onDealerChange: (dealerId: number | null) => void;
  selectedDealer: number | null;
}

export default function DealerSelect({
  regionId,
  onDealerChange,
  selectedDealer,
}: DealerSelectProps) {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!regionId) {
      setDealers([]);
      return;
    }

    // Client에서 fetch로 조회
    const fetchDealers = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(
          `${apiUrl}/dealers?regionId=${regionId}`
        );
        if (!response.ok) throw new Error("딜러사 조회 실패");
        const data = await response.json();
        setDealers(data);
      } catch (error) {
        console.error("딜러사 조회 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, [regionId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dealerId = e.target.value;
    onDealerChange(dealerId ? parseInt(dealerId) : null);
  };

  return (
    <div className={styles.selectContainer}>
      <label htmlFor="dealer" className={styles.selectLabel}>
        🏪 딜러사 선택
      </label>
      <select
        id="dealer"
        onChange={handleChange}
        value={selectedDealer || ""}
        className={styles.selectInput}
        disabled={!regionId || loading}
      >
        <option value="">
          {!regionId
            ? "지역을 먼저 선택해주세요"
            : loading
              ? "로딩 중..."
              : "딜러사를 선택해주세요"}
        </option>
        {dealers.map((dealer) => (
          <option key={dealer.id} value={dealer.id}>
            {dealer.name} - {dealer.address}
          </option>
        ))}
      </select>
    </div>
  );
}
