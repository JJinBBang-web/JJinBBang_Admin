import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createProhibitedWord,
  deleteProhibitedWord,
  updateProhibitedWordStatus,
} from '../api/prohibitedWords';

export function useProhibitedWordActions() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['prohibitedWords'] });

  const create = useMutation({
    mutationFn: (word: string) => createProhibitedWord(word),
    onSuccess: invalidate,
  });

  const updateStatus = useMutation({
    mutationFn: ({ wordId, enabled }: { wordId: number; enabled: boolean }) =>
      updateProhibitedWordStatus(wordId, enabled),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (wordId: number) => deleteProhibitedWord(wordId),
    onSuccess: invalidate,
  });

  return { create, updateStatus, remove };
}
