import axios from 'axios';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

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