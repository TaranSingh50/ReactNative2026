import { useCallback, useRef, useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import Toast from 'react-native-toast-message';
import { getErrorMessage } from '../api/errorHandler';

interface UseApiOptions {
  retries?: number;
}

export const useApi = <TRequest extends any[], TResponse>(
  apiFunction: (...args: [...TRequest, any?]) => Promise<{ data: TResponse }>,
  options: UseApiOptions = {},
) => {
  const { retries = 0 } = options;

  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelSource = useRef<CancelTokenSource | null>(null);

  const callApi = useCallback(
    async (...args: TRequest): Promise<TResponse> => {
      cancelSource.current = axios.CancelToken.source();

      let lastError: unknown;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          setLoading(true);
          setError(null);

          const response = await apiFunction(
            ...args,
            cancelSource.current.token,
          );

          setData(response.data);
          return response.data;
        } catch (err) {
          lastError = err;

          if (axios.isCancel(err)) {
            throw err;
          }

          if (attempt === retries) {
            const message = getErrorMessage(err);
            setError(message);

            Toast.show({
              type: 'error',
              text1: message,
            });
          }
        } finally {
          setLoading(false);
        }
      }

      // 🔥 This guarantees return type safety
      throw lastError;
    },
    [apiFunction, retries],
  );

  useEffect(() => {
    return () => {
      cancelSource.current?.cancel('Component unmounted');
    };
  }, []);

  return {
    data,
    loading,
    error,
    callApi,
  };
};
