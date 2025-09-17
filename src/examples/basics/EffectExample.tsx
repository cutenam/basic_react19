import { useState, useEffect } from 'react';

/**
 * useEffect 기본 사용법 예제
 */
export default function EffectExample() {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [timer, setTimer] = useState(0);

  // 1. 컴포넌트 마운트/언마운트 시 실행
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다');
    
    return () => {
      console.log('컴포넌트가 언마운트됩니다');
    };
  }, []); // 빈 배열 = 마운트 시에만 실행

  // 2. count가 변경될 때마다 실행
  useEffect(() => {
    document.title = `카운트: ${count}`;
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
      <h3>useEffect 기본 예제</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p>카운트: {count} (브라우저 탭 제목도 확인해보세요!)</p>
        <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <p>현재 윈도우 너비: {windowWidth}px</p>
        <small>브라우저 창 크기를 조절해보세요!</small>
      </div>

      <div>
        <p>타이머: {timer}초</p>
        <button onClick={() => setTimer(0)}>타이머 리셋</button>
      </div>
    </div>
  );
}
