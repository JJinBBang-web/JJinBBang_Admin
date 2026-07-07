import { useQuery } from '@tanstack/react-query';
import { fetchCertificateDetail } from '../api/certificates';

export function useCertificateDetail(certificateId: string | null) {
  return useQuery({
    queryKey: ['certificate', certificateId],
    queryFn: () => fetchCertificateDetail(certificateId!),
    enabled: !!certificateId,
  });
}
