import { useQuery } from '@tanstack/react-query';
import { getCertificateDetail } from '../api/certificates';

export function useCertificateDetail(certificateId: string | null) {
  return useQuery({
    queryKey: ['certificate', certificateId],
    queryFn: () => getCertificateDetail(certificateId!),
    enabled: !!certificateId,
  });
}
