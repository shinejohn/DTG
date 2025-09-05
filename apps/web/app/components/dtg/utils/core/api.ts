/**
 * API utilities for making network requests
 * Provides a consistent interface for all API calls
 */
// Types
export interface ApiResponse<T = any> {
  data: T | null;
  error: Error | null;
  status: number;
  isLoading: boolean;
}
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  cache?: RequestCache;
  signal?: AbortSignal;
}
// Default API configuration
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '/api',
  defaultHeaders: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds
};
/**
 * Create an abort controller with timeout
 */
export function createAbortController(timeoutMs = API_CONFIG.timeout): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller;
}
/**
 * Build a URL with query parameters
 */
export function buildUrl(endpoint: string, params?: Record<string, any>): string {
  const url = new URL(endpoint.startsWith('http') ? endpoint : `${API_CONFIG.baseUrl}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}
/**
 * Generic fetch function with error handling
 */
export async function fetchData<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const {
    headers = {},
    params,
    signal,
    cache
  } = options;
  try {
    const url = buildUrl(endpoint, params);
    const response = await fetch(url, {
      headers: {
        ...API_CONFIG.defaultHeaders,
        ...headers
      },
      signal,
      cache
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return {
      data,
      error: null,
      status: response.status,
      isLoading: false
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
      status: 0,
      isLoading: false
    };
  }
}
/**
 * HTTP methods wrapper functions
 */
export const api = {
  get: <T,>(endpoint: string, options?: RequestOptions) => fetchData<T>(endpoint, {
    ...options,
    cache: options?.cache || 'default'
  }),
  post: async <T,>(endpoint: string, data: any, options: RequestOptions = {}) => {
    const controller = createAbortController();
    return fetchData<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers
      },
      signal: options.signal || controller.signal
    });
  },
  put: async <T,>(endpoint: string, data: any, options: RequestOptions = {}) => {
    const controller = createAbortController();
    return fetchData<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers
      },
      signal: options.signal || controller.signal
    });
  },
  delete: <T,>(endpoint: string, options?: RequestOptions) => fetchData<T>(endpoint, options)
};