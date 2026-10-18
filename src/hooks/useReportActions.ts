import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dismissReport, type DismissReportPayload } from '../api/reports';

export function useReportActions() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['reports'] });

  const dismiss = useMutation({
    mutationFn: ({ reportId, payload }: { reportId: number; payload: DismissReportPayload }) =>
      dismissReport(reportId, payload),
    onSuccess: invalidate,
  });

  return { dismiss };
}
