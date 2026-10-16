import { useQuery } from '@tanstack/react-query';
import { getCertificateDetail } from '../api/certificates';
import type { CertificateStatus } from '../types';

export function useCertificateDetail(certificateId: string | null, status: CertificateStatus) {
  return useQuery({
    queryKey: ['certificate', certificateId, status],
    queryFn: () => getCertificateDetail(certificateId!, status),
    enabled: !!certificateId,
  });
}
