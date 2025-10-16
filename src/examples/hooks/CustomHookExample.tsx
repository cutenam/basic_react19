import { useCounter, useLocalStorage, useFetch } from '../../hooks';
import type { Post } from '../../types';
import Button from '../../components/common/Button';
import { useTranslation } from 'react-i18next';

/**
 * 커스텀 훅 사용 예제
 */
export default function CustomHookExample() {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>{t('features.customHook.title')}</h3>
      
      <CounterHookExample />
      <LocalStorageHookExample />
      <FetchHookExample />
    </div>
  );
}

function CounterHookExample() {
  const { count, increment, decrement, reset, setValue } = useCounter(0);
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
      <h4>{t('features.customHook.heading.titleUseCounter')}</h4>
      <p>{t('common.count')}: {count}</p>
      <p>
       {t('features.customHook.label.inputNumber')}<input type="number" value={count} onChange={(e) => setValue(Number(e.target.value))} style={{ padding: '5px', marginLeft: '10px', width: '30%' }} />
      </p>
      <div>
        <Button variant='function' size='medium' style={{ marginRight: '5px' }} onClick={increment}>{t('common.increase')}</Button>
        <Button variant='function' size='medium' style={{ marginRight: '5px' }} onClick={decrement}>{t('common.decrease')}</Button>
        <Button variant='function' size='medium' style={{ marginRight: '5px' }} onClick={reset}>{t('common.reset')}</Button>
      </div>
    </div>
  );
}

function LocalStorageHookExample() {
  const [name, setName] = useLocalStorage('userName', '');
  const { t } = useTranslation();
  
  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
      <h4>{t('features.customHook.heading.titleUseLocalStorage')}</h4>
      <p>{t('features.customHook.label.savedName')}: {name || t('features.customHook.label.nothing')}</p>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('features.customHook.label.enterName')}
        style={{ padding: '5px', marginRight: '10px', width: '50%' }}
      />
      {/*<button onClick={() => setName('')}>지우기</button>*/}
      <Button variant='function' size='medium' style={{ marginLeft: '5px'}} onClick={() => setName('')}>{t('common.reset')}</Button>
    </div>
  );
}

function FetchHookExample() {
  const { data, loading, error } = useFetch<Post>('https://jsonplaceholder.typicode.com/posts/1');
  const { t } = useTranslation();

  // 타입 안전한 데이터 접근 예시
  const handleDataAccess = () => {
    // 이제 data는 Post | null 타입이므로 타입 안전하게 접근 가능
    if (data) {
      console.log('제목:', data.title);
      console.log('내용:', data.body);
      console.log('사용자 ID:', data.userId);
    }
  };
  
  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
      <h4>{t('features.customHook.heading.titleUseFetch')}</h4>
      {loading && <p>{t('common.loading')}</p>}
      {error && <p style={{ color: 'red' }}>{t('features.customHook.label.error')}: {error}</p>}
      {data && (
        <div>
          <h5>{t('common.title')}: {data.title}</h5>
          <p>{t('common.content')} : {data.body}</p>
          {/*<button onClick={handleDataAccess}>데이터 접근 테스트</button>*/}
        </div>
      )}
    </div>
  );
}
