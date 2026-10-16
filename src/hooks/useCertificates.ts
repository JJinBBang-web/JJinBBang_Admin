// src/hooks/useCertificates.ts
import { useQuery } from '@tanstack/react-query';
import { fetchCertificates } from '../api/certificates';
import type { CertificateStatus } from '../types';

interface UseCertificatesParams {
  status: CertificateStatus;
  page: number;
  size: number;
}

export function useCertificates({ status, page, size }: UseCertificatesParams) {
  return useQuery({
    queryKey: ['certificates', status, page, size],
    queryFn: () => fetchCertificates({ status, page, size }),
  });
}

// 대기 탭 배지용 건수 (어느 탭에 있든 표시)
export function useCertificatePendingCount() {
  return useQuery({
    queryKey: ['certificates', 'pending', 'count'],
    queryFn: () => fetchCertificates({ status: 'pending', page: 0, size: 1 }),
    select: (data) => data.pageInfo?.totalElements ?? 0,
  });
}
