import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveCertificate, rejectCertificate } from '../api/certificates';

export function useCertificateActions() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['certificates'] });

  const approve = useMutation({
    mutationFn: (id: string) => approveCertificate(id),
    onSuccess: invalidate,
  });

  const reject = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => rejectCertificate(id, reason),
    onSuccess: invalidate,
  });

  return { approve, reject };
}
