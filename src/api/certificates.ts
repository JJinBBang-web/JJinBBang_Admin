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

// 합격증명서 상세 응답 타입
export interface CertificateDetailDto {
  certificateId: number;
  userId: number;
  userName?: string | null;
  imageUrl: string | null; // 합격증 이미지 URL
  schoolName: string;
  createdAt: string; // 신청일시 'YYYY-MM-DD HH:mm'
  userCreatedAt: string; // 가입일 'YYYY-MM-DD'
  email: string; // 마스킹된 이메일
  reuploadedId: number | null; // 재업로드 원본 증명서 id (없으면 null)
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

function toCertificateDetail(
  item: CertificateDetailDto,
  status: CertificateStatus,
): CertificateDetail {
  return {
    id: String(item.certificateId),
    userId: String(item.userId),
    appliedAt: item.createdAt,
    elapsedHours: toElapsedHours(item.createdAt),
    // userName이 아직 응답에 없어 userId로 대체 표시
    nickname: item.userName ?? String(item.userId),
    school: item.schoolName,
    isReupload: item.reuploadedId != null,
    status,
    joinedAt: item.userCreatedAt,
    email: item.email,
    imageUrl: item.imageUrl || null,
  };
}

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

// 합격증명서 상세 조회
// 상세 응답에 상태값이 없어서, 목록에서 넘겨준 status를 함께 받아 매핑
export async function getCertificateDetail(
  id: string,
  status: CertificateStatus,
): Promise<CertificateDetail> {
  const data = await http.get<CertificateDetailDto>(
    `/admin/certificates/admission/${encodeURIComponent(id)}`,
  );
  return toCertificateDetail(data, status);
}

// 합격증명서 승인 (PATCH, path에 certificateId가 아닌 userId 사용)
export async function patchApproveCertificate(userId: string): Promise<void> {
  await http.patch<null>(
    `/admin/certificates/admission/${encodeURIComponent(userId)}/approve`,
  );
}

// 합격증명서 반려 (PATCH, path에 userId 사용)
// 현재 API 명세상 반려 사유를 받는 body가 없어 사유는 전송하지 않음 -> 원인으로 오류 발생하는 것 같음
export async function patchRejectCertificate(userId: string): Promise<void> {
  await http.patch<null>(
    `/admin/certificates/admission/${encodeURIComponent(userId)}/reject`,
  );
}
