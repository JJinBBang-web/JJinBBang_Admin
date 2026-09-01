// src/api/certificates.ts
import type { Certificate, CertificateDetail } from '../types';

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

export async function getCertificates(): Promise<Certificate[]> {
  return MOCK_CERTIFICATES;
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
