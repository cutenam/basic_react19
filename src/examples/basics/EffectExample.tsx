import { useState, useEffect } from 'react';
import Button from "../../components/common/Button.tsx";
import { useTranslation } from 'react-i18next';

/**
 * useEffect 기본 사용법 예제
 * EffectExample is a React functional component that demonstrates the usage of the useEffect hook.
 * It includes various useEffect examples such as handling component lifecycle events, updating the document title,
 * handling window resize events, and implementing a timer.
 *
 * @return {JSX.Element} A JSX element that displays examples of useEffect in managing state changes,
 * window resize events, and a timer.
 */
export default function EffectExample() {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [timer, setTimer] = useState(0);
  const { t } = useTranslation();

  // 1. 컴포넌트 마운트/언마운트 시 실행
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다');
    
    return () => {
      console.log('컴포넌트가 언마운트됩니다');
    };
  }, []); // 빈 배열 = 마운트 시에만 실행

  // 2. count가 변경될 때마다 실행
  useEffect(() => {
    document.title = `${t('common.count')}: ${count}`;
  }, [count]); // count 의존성

  // 3. 윈도우 리사이즈 이벤트 리스너
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // 클린업 함수
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 4. 타이머 예제
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>{t('features.useEffect.title')}</h2>

      <h3>{`1. ${t('features.useEffect.heading.titleWindowTitle')}`}</h3>
      <div style={{ marginBottom: '15px' }}>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{t('common.count')}: {count}
          <Button variant='function' size='medium' style={{ marginLeft: '10px', border: '1px solid #dee2e6' }} onClick={() => setCount(count + 1)}>{t('common.increase')}</Button>
        </p>
      </div>

      <h3>{`2. ${t('features.useEffect.heading.titleWindowSize')}`}</h3>
      <div style={{ marginBottom: '15px' }}>
        <small>({t('features.useEffect.label.textAdjustWindowSize')}
          )</small>
        <p>{t('features.useEffect.label.textWindowSize')}: {windowWidth}px</p>
      </div>

      <h3>{`3. ${t('features.useEffect.heading.titleTimer')}`}</h3>
      <div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {t('common.timer')}: {t('features.useEffect.label.second', {count: timer})}
          <Button variant='function' size='medium' style={{ marginLeft: '10px', border: '1px solid #dee2e6' }} onClick={() => setTimer(0)}>{t('common.reset')}</Button>
        </p>
      </div>
    </div>
  );
}
