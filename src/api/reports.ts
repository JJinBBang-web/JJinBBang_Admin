import { http } from './client';
import type { PageInfo, RejectReasonType, ReportedReview, ReportProcessStatus } from '../types';

export interface ReportListParams {
  status?: ReportProcessStatus;
  page?: number;
  size?: number;
}

export interface ReportListData {
  reportReviewList: ReportedReview[];
  pageInfo: PageInfo;
}

export function fetchReports(params: ReportListParams = {}): Promise<ReportListData> {
  return http.get<ReportListData>('/admin/reports', params);
}

export interface DismissReportPayload {
  rejectReasonType: RejectReasonType;
  customReason?: string;
}

export interface DismissedReport {
  reportId: number;
  status: 'REJECT';
  handledAt: string;
  handler: string;
}

export function dismissReport(
  reportId: number,
  payload: DismissReportPayload,
): Promise<DismissedReport> {
  return http.post<DismissedReport>(`/admin/reports/dismiss/${reportId}`, payload);
}
