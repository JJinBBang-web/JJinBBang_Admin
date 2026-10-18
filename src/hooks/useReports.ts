import { useQuery } from '@tanstack/react-query';
import { fetchReports, type ReportListParams } from '../api/reports';

export function useReports(params: ReportListParams = {}) {
  const { status, page, size } = params;

  return useQuery({
    queryKey: ['reports', status, page, size],
    queryFn: () => fetchReports(params),
  });
}
