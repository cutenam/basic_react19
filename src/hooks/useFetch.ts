import { useState, useEffect } from 'react';

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
              errorMessage = '잘못된 요청입니다. (400 Bad Request)';
              break;
            case 401:
              errorMessage = '인증이 필요합니다. (401 Unauthorized)';
              break;
            case 403:
              errorMessage = '접근 권한이 없습니다. (403 Forbidden)';
              break;
            case 404:
              errorMessage = '요청한 리소스를 찾을 수 없습니다. (404 Not Found)';
              break;
            case 408:
              errorMessage = '요청 시간이 초과되었습니다. (408 Request Timeout)';
              break;
            case 429:
              errorMessage = '너무 많은 요청입니다. 잠시 후 다시 시도해주세요. (429 Too Many Requests)';
              break;
            case 500:
              errorMessage = '서버 내부 오류가 발생했습니다. (500 Internal Server Error)';
              break;
            case 502:
              errorMessage = '서버 게이트웨이 오류입니다. (502 Bad Gateway)';
              break;
            case 503:
              errorMessage = '서비스를 일시적으로 사용할 수 없습니다. (503 Service Unavailable)';
              break;
            case 504:
              errorMessage = '게이트웨이 시간 초과입니다. (504 Gateway Timeout)';
              break;
            default:
              if (response.status >= 400 && response.status < 500) {
                errorMessage = `클라이언트 오류가 발생했습니다. (${response.status})`;
              } else if (response.status >= 500) {
                errorMessage = `서버 오류가 발생했습니다. (${response.status})`;
              } else {
                errorMessage = `HTTP 오류가 발생했습니다. (${response.status})`;
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
