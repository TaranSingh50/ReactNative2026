import { useCallback, useState } from 'react'
import Toast from 'react-native-toast-message'
import { getErrorMessage } from '../api/errorHandler'

interface UseApiOptions {
  retries?: number
}

export const useApi = <TRequest, TResponse>(
  apiFunction: (params: TRequest) => Promise<TResponse>,
  options: UseApiOptions = {}
) => {
  const { retries = 0 } = options

  const [data, setData] = useState<TResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const callApi = useCallback(
    async (params: TRequest): Promise<TResponse> => {
      let lastError: unknown

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          setLoading(true)
          setError(null)

          const result = await apiFunction(params)

          setData(result)
          return result
        } catch (err) {
          lastError = err

          if (attempt === retries) {
            const message = getErrorMessage(err)
            setError(message)

            Toast.show({
              type: 'error',
              text1: message,
            })
          }
        } finally {
          setLoading(false)
        }
      }

      throw lastError
    },
    [apiFunction, retries]
  )

  return {
    data,
    loading,
    error,
    callApi,
  }
}
