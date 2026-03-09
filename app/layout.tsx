// ============================================
// Root Layout
// ============================================

import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "BMW 딜러사",
  description: "법인 고객을 위한 BMW 프리미엄 차량 신청 시스템",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
