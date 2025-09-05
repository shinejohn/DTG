import { useState, useEffect, useCallback } from 'react';
interface UseAsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}
interface UseAsyncOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}
/**
 * Hook for handling async operations with loading, error, and success states
 */
export function useAsync<T = any>(asyncFunction: () => Promise<T>, options: UseAsyncOptions = {}) {
  const {
    immediate = true,
    onSuccess,
    onError
  } = options;
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    error: null,
    isLoading: immediate,
    isSuccess: false,
    isError: false
  });
  const execute = useCallback(async () => {
    setState({
      data: null,
      error: null,
      isLoading: true,
      isSuccess: false,
      isError: false
    });
    try {
      const response = await asyncFunction();
      setState({
        data: response,
        error: null,
        isLoading: false,
        isSuccess: true,
        isError: false
      });
      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      setState({
        data: null,
        error: errorObject,
        isLoading: false,
        isSuccess: false,
        isError: true
      });
      if (onError) {
        onError(errorObject);
      }
      throw errorObject;
    }
  }, [asyncFunction, onSuccess, onError]);
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return {
    ...state,
    execute
  };
}