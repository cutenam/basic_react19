import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * HTTP 요청을 처리하는 커스텀 훅
 */
export function useFetch<T = unknown>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // URL이 유효하지 않으면 요청하지 않음
    if (!url || url.trim() === '') {
      setLoading(false);
      setError(null);
      setData(null);
      return;
    }

    // AbortController로 요청 취소 가능하게 함
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          // HTTP 상태 코드별 구체적인 에러 메시지 제공
          let errorMessage = `HTTP ${response.status}`;
          
          switch (response.status) {
            case 400:
              errorMessage = t('error.httpResponse.400');
              break;
            case 401:
              errorMessage = t('error.httpResponse.401');
              break;
            case 403:
              errorMessage = t('error.httpResponse.403');
              break;
            case 404:
              errorMessage = t('error.httpResponse.404');
              break;
            case 408:
              errorMessage = t('error.httpResponse.408');
              break;
            case 429:
              errorMessage = t('error.httpResponse.429');
              break;
            case 500:
              errorMessage = t('error.httpResponse.500');
              break;
            case 502:
              errorMessage = t('error.httpResponse.502');
              break;
            case 503:
              errorMessage = t('error.httpResponse.503');
              break;
            case 504:
              errorMessage = t('error.httpResponse.504');
              break;
            default:
              if (response.status >= 400 && response.status < 500) {
                errorMessage = `${t('error.checkClient')}(${response.status})`;
              } else if (response.status >= 500) {
                errorMessage = `${t('error.checkServer')}(${response.status})`;
              } else {
                errorMessage = `${t('error.httpError')}(${response.status})`;
              }
          }
          
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        // AbortError는 무시 (정상적인 취소)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    void fetchData();

    // cleanup 함수: 컴포넌트 언마운트 시 요청 취소
    return () => {
      abortController.abort();
    };
  }, [url]);



  return { data, loading, error };
}
