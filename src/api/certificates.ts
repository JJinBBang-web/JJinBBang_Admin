// src/api/certificates.ts
import type { Certificate, CertificateDetail, CertificateStatus, PageInfo } from '../types';
import { http } from './client';

// 타입
export type CertificateApiStatus = 'PENDING' | 'APPROVE' | 'REJECT';

// 합격증명서 목록 쿼리
export interface CertificateListQuery {
  status: CertificateApiStatus;
  page: number;
  size: number;
}

// 합격증명서 목록 아이템 타입
export interface CertificateListItemDto {
  certificateId: number;
  createdAt: string;
  userId: number;
  userName?: string | null;
  isReuploaded: boolean;
  schoolName: string;
}

// 합격증명서 목록 데이터 타입
export interface CertificateListData {
  certificateList: CertificateListItemDto[];
  pageInfo: PageInfo;
}

// 합격증명서 목록 필터 타입
export interface CertificateListFilters {
  status?: CertificateStatus;
  page?: number;
  size?: number;
}

// 합격증명서 목록 결과 타입
export interface CertificateListResult {
  certificates: Certificate[];
  pageInfo: PageInfo;
}

// 타입 매핑
const STATUS_MAP: Record<CertificateStatus, CertificateApiStatus> = {
  pending: 'PENDING',
  approved: 'APPROVE',
  rejected: 'REJECT',
};

const HOUR_MS = 60 * 60 * 1000;

// 'YYYY-MM-DD HH:mm' → 신청 후 경과 시간(시간 단위)
function toElapsedHours(createdAt: string): number {
  const created = new Date(createdAt.replace(' ', 'T')).getTime();
  if (Number.isNaN(created)) {
    return 0;
  }
  return Math.max(0, Math.floor((Date.now() - created) / HOUR_MS));
}

function toCertificate(
  item: CertificateListItemDto,
  status: CertificateStatus,
): Certificate {
  return {
    id: String(item.certificateId),
    appliedAt: item.createdAt,
    elapsedHours: toElapsedHours(item.createdAt),
    // userName이 아직 응답에 없어 userId로 대체 표시
    nickname: item.userName ?? String(item.userId),
    school: item.schoolName,
    isReupload: item.isReuploaded,
    status,
  };
}

const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    appliedAt: '2026-06-05 05:10',
    elapsedHours: 25,
    nickname: '전남대25학번',
    school: '전남대',
    isReupload: true,
    status: 'pending',
  },
  {
    id: '2',
    appliedAt: '2026-06-05 19:20',
    elapsedHours: 11,
    nickname: '부산뉴비',
    school: '부산대',
    isReupload: false,
    status: 'pending',
  },
  {
    id: '3',
    appliedAt: '2026-06-06 00:30',
    elapsedHours: 6,
    nickname: '가좌동입성',
    school: '경상국립대',
    isReupload: false,
    status: 'pending',
  },
  {
    id: '4',
    appliedAt: '2026-06-04 10:00',
    elapsedHours: 30,
    nickname: '공대새내기',
    school: '충남대',
    isReupload: false,
    status: 'approved',
  },
  {
    id: '5',
    appliedAt: '2026-06-03 15:40',
    elapsedHours: 40,
    nickname: '기타대학생',
    school: '제주대',
    isReupload: false,
    status: 'rejected',
  },
];

const MOCK_CERTIFICATE_DETAILS: Record<string, Partial<CertificateDetail>> = {
  '1': {
    joinedAt: '2026-06-04',
    email: 'jeon***@jnu.ac.kr',
    imageUrl: null,
  },
};

// 합격증명서 목록 조회
export async function fetchCertificates(
  filters: CertificateListFilters = {},
): Promise<CertificateListResult> {
  const { status = 'pending', page = 0, size = 10 } = filters;
  const query: CertificateListQuery = { status: STATUS_MAP[status], page, size };

  const data = await http.get<CertificateListData>(
    '/admin/certificates/admission',
    query,
  );

  return {
    certificates: (data.certificateList ?? []).map((item) =>
      toCertificate(item, status),
    ),
    pageInfo: data.pageInfo,
  };
}

export async function getCertificateDetail(id: string): Promise<CertificateDetail | null> {
  const certificate = MOCK_CERTIFICATES.find((item) => item.id === id);
  if (!certificate) {
    return null;
  }

  const extra = MOCK_CERTIFICATE_DETAILS[id];
  return {
    ...certificate,
    joinedAt: extra?.joinedAt ?? certificate.appliedAt.slice(0, 10),
    email: extra?.email ?? '–',
    imageUrl: extra?.imageUrl ?? null,
  };
}

export async function putApproveCertificate(id: string): Promise<void> {
  const certificate = MOCK_CERTIFICATES.find((item) => item.id === id);
  if (certificate) {
    certificate.status = 'approved';
  }
}

export async function putRejectCertificate(id: string, reason: string): Promise<void> {
  void reason;
  const certificate = MOCK_CERTIFICATES.find((item) => item.id === id);
  if (certificate) {
    certificate.status = 'rejected';
  }
}
