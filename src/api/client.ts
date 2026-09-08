import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface CsrfToken {
  token: string;
  parameterName: string;
  headerName: string;
}

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

// CSRF-safe methods
const CSRF_SAFE_METHODS = new Set(['get', 'head', 'options', 'trace']);

let csrfTokenCache: CsrfToken | null = null;
let csrfTokenPromise: Promise<CsrfToken> | null = null;

async function fetchCsrfToken(): Promise<CsrfToken> {
  const { data } = await apiClient.get<ApiResponse<CsrfToken>>('/admin/auth/csrf');
  return data.data;
}

// CSRF 토큰 가져오기
export async function getCsrfToken(forceRefresh = false): Promise<CsrfToken> {
  if (!forceRefresh && csrfTokenCache) {
    return csrfTokenCache;
  }

  if (!csrfTokenPromise) {
    csrfTokenPromise = fetchCsrfToken()
      .then((token) => {
        csrfTokenCache = token;
        return token;
      })
      .finally(() => {
        csrfTokenPromise = null;
      });
  }

  return csrfTokenPromise;
}

function clearCsrfToken(): void {
  csrfTokenCache = null;
}

// 모든 상태 변경 요청에 CSRF 헤더 자동 첨부
apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const method = config.method?.toLowerCase();
  if (!method || CSRF_SAFE_METHODS.has(method)) {
    return config;
  }

  const csrf = await getCsrfToken();
  config.headers = config.headers ?? new AxiosHeaders();
  config.headers.set(csrf.headerName, csrf.token);
  return config;
});

// 오래된 CSRF 토큰으로 인한 403 에러 방지
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      clearCsrfToken();
    }
    return Promise.reject(error);
  },
);

async function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  const { data } = await promise;
  if (data.code !== 200) {
    throw new Error(data.message);
  }
  return data.data;
}

export const http = {
  get: <T>(url: string, params?: object) => unwrap<T>(apiClient.get(url, { params })),
  post: <T>(url: string, body?: unknown) => unwrap<T>(apiClient.post(url, body)),
  put: <T>(url: string, body?: unknown) => unwrap<T>(apiClient.put(url, body)),
  delete: <T>(url: string) => unwrap<T>(apiClient.delete(url)),
};
