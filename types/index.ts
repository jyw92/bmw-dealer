// ============================================
// 타입 정의
// ============================================

export interface Region {
  id: number;
  name: string;
  code: string;
}

export interface Dealer {
  id: number;
  name: string;
  regionId: number;
  address: string;
  phone: string;
  email: string;
}

export interface Vehicle {
  id: number;
  model: string;
  year: number;
  engine: string;
  price: number;
  image: string;
  description: string;
  dealerId: number;
}

export interface Application {
  id?: number;
  vehicleId: number;
  dealerId: number;
  companyNumber: string;
  companyName: string;
  name: string;
  phone: string;
  agreePersonal: boolean;
  agreeMarketing: boolean;
  agreeTerms: boolean;
  createdAt?: string;
}

export interface ApiResponse<T> {
  status: boolean;
  data?: T;
  error?: string;
  message?: string;
}
