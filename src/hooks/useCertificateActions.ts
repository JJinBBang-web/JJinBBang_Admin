import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApproveCertificate, patchRejectCertificate } from '../api/certificates';

export function useCertificateActions() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['certificates'] });
    queryClient.invalidateQueries({ queryKey: ['certificate'] });
  };

  const approve = useMutation({
    mutationFn: (userId: string) => patchApproveCertificate(userId),
    onSuccess: invalidate,
  });

  // reason은 반려 API에 사유 필드가 생기면 전달할 수 있도록 시그니처만 유지
  const reject = useMutation({
    mutationFn: ({ userId }: { userId: string; reason: string }) =>
      patchRejectCertificate(userId),
    onSuccess: invalidate,
  });

  return { approve, reject };
}
