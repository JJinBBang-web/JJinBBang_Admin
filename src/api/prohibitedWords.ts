import { http } from './client';
import type { PageInfo, ProhibitedWord } from '../types';

export interface ProhibitedWordListParams {
  enabled?: boolean;
  page?: number;
  size?: number;
}

export interface ProhibitedWordListData {
  prohibitedWordList: ProhibitedWord[];
  pageInfo: PageInfo;
}

export function fetchProhibitedWords(
  params: ProhibitedWordListParams = {},
): Promise<ProhibitedWordListData> {
  return http.get<ProhibitedWordListData>('/admin/prohibited-words', params);
}

export function createProhibitedWord(word: string): Promise<ProhibitedWord> {
  return http.post<ProhibitedWord>('/admin/prohibited-words', { word });
}

export function updateProhibitedWordStatus(
  wordId: number,
  enabled: boolean,
): Promise<ProhibitedWord> {
  return http.patch<ProhibitedWord>(`/admin/prohibited-words/${wordId}`, { enabled });
}

export function deleteProhibitedWord(wordId: number): Promise<null> {
  return http.delete<null>(`/admin/prohibited-words/${wordId}`);
}
