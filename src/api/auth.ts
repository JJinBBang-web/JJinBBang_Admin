import { apiClient, getCsrfToken, type ApiResponse, type CsrfToken } from './client';

export { getCsrfToken };
export type { CsrfToken };

export interface AdminSession {
  id: number;
  email: string | null;
  username: string | null;
  displayName: string | null;
}

export const getCurrentAdmin = async () => {
  const response =
    await apiClient.get<ApiResponse<AdminSession>>('/admin/auth/me');
  return response.data.data;
};

export const submitLogout = async () => {
  const csrf = await getCsrfToken(true);
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
