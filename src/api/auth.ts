import { apiClient, type ApiResponse } from './client';

export interface AdminSession {
  id: number;
  email: string | null;
  username: string | null;
  displayName: string | null;
}

export interface CsrfToken {
  token: string;
  parameterName: string;
  headerName: string;
}

export const getCurrentAdmin = async () => {
  const response =
    await apiClient.get<ApiResponse<AdminSession>>('/admin/auth/me');
  return response.data.data;
};

export const getCsrfToken = async () => {
  const response =
    await apiClient.get<ApiResponse<CsrfToken>>('/admin/auth/csrf');
  return response.data.data;
};

export const submitLogout = async () => {
  const csrf = await getCsrfToken();
  const form = document.createElement('form');
  const token = document.createElement('input');

  form.method = 'POST';
  form.action = '/api/admin/auth/logout';
  form.hidden = true;

  token.type = 'hidden';
  token.name = csrf.parameterName;
  token.value = csrf.token;
  form.append(token);
  document.body.append(form);
  form.submit();
};
