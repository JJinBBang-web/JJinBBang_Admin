import type { ReviewSortOrder } from "../../types";

export const SCHOOL_OPTIONS = [
    { value: 'all', label: '학교 전체' },
    { value: '경상국립대', label: '경상국립대' },
    { value: '경북대', label: '경북대' },
    { value: '강원대', label: '강원대' },
    { value: '부산대', label: '부산대' },
    { value: '서울대', label: '서울대' },
    { value: '전남대', label: '전남대' },
    { value: '전북대', label: '전북대' },
    { value: '제주대', label: '제주대' },
    { value: '충남대', label: '충남대' },
    { value: '충북대', label: '충북대' },
  ];
  
export const PERIOD_OPTIONS = [
    { value: 'all', label: '기간 전체' },
    { value: '7d', label: '지난 7일' },
    { value: '30d', label: '지난 30일' },
    { value: '1y', label: '지난 1년' },
  ];
  
export const STATUS_OPTIONS = [
    { value: 'all', label: '상태 전체' },
    { value: 'public', label: '공개' },
    { value: 'private', label: '비공개' },
  ];
  
export const SORT_OPTIONS: { value: ReviewSortOrder; label: string }[] = [
    { value: 'latest', label: '최신순' },
    { value: 'reportest', label: '신고순' },
    { value: 'rating_high', label: '별점 높은순' },
    { value: 'rating_low', label: '별점 낮은순' },
  ];