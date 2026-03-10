// ============================================
// Server Action - 신청 제출만
// 조회는 Client에서 fetch 사용
// ============================================

'use server';

import type {Application, ApiResponse} from '@/types';
import {revalidatePath} from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * 신청 데이터 저장
 * FormData로 받아서 처리
 */
export async function submitApplicationAction(_: unknown, formData: FormData): Promise<ApiResponse<Application>> {
  try {
    // FormData에서 데이터 추출
    const vehicleId = formData.get('vehicleId')?.toString();
    const dealerId = formData.get('dealerId')?.toString();
    const companyNumber = formData.get('companyNumber')?.toString();
    const companyName = formData.get('companyName')?.toString();
    const name = formData.get('name')?.toString();
    const phone = formData.get('phone')?.toString();
    const agreePersonal = formData.get('agreePersonal') === 'true';
    const agreeMarketing = formData.get('agreeMarketing') === 'true';
    const agreeTerms = formData.get('agreeTerms') === 'true';

    // 필수 필드 검증
    if (!vehicleId || !dealerId || !companyNumber || !companyName || !name || !phone) {
      return {
        status: false,
        error: '모든 필드를 입력해주세요',
      };
    }

    if (!agreePersonal || !agreeTerms) {
      return {
        status: false,
        error: '필수 약관에 동의해주세요',
      };
    }

    // JSON Server에 저장
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vehicleId: parseInt(vehicleId),
        dealerId: parseInt(dealerId),
        companyNumber,
        companyName,
        name,
        phone,
        agreePersonal,
        agreeMarketing,
        agreeTerms,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('신청 저장 실패');
    }

    const data = await response.json();

    // 캐시 재검증 (필요시)
    revalidatePath('/');

    return {
      status: true,
      message: '신청이 완료되었습니다!',
      data,
    };
  } catch (error) {
    console.error('submitApplicationAction 에러:', error);
    return {
      status: false,
      error: '신청 처리 중 오류가 발생했습니다',
    };
  }
}
