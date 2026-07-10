import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putApproveCertificate, putRejectCertificate } from '../api/certificates';

export function useCertificateActions() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['certificates'] });

  const approve = useMutation({
    mutationFn: (id: string) => putApproveCertificate(id),
    onSuccess: invalidate,
  });

  const reject = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => putRejectCertificate(id, reason),
    onSuccess: invalidate,
  });

  return { approve, reject };
}
