import { useQuery } from '@tanstack/react-query';
import { fetchProhibitedWords, type ProhibitedWordListParams } from '../api/prohibitedWords';

export function useProhibitedWords(
  params: ProhibitedWordListParams = {},
  options: { enabled?: boolean } = {},
) {
  const { enabled, page, size } = params;

  return useQuery({
    queryKey: ['prohibitedWords', enabled, page, size],
    queryFn: () => fetchProhibitedWords(params),
    enabled: options.enabled,
  });
}
