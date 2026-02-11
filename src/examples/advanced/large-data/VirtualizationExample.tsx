/**
 * 가상 스크롤링 (Virtualization) 예제
 * 
 * - 대용량 리스트를 렌더링할 때 화면에 보이는 항목만 실제로 DOM에 렌더링하여 성능을 최적화하는 기법
 * - react-window 라이브러리를 사용하지 않고 직접 구현한 예제
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';

// 대용량 데이터 타입
interface Item {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

// 대량의 데이터 생성, [{Item}, {Item}....]
const generateLargeDataset = (count: number): Item[] => {
  const cities = ['서울', '부산', '인천', '대구', '대전', '광주', '울산', '수원', '창원', '고양'];
  // Array.from() 유사배열 객체를 배열로 변환
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `사용자 ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: 20 + (i % 50),
    city: cities[i % cities.length],
  }));
};

// 가상스크롤링 구현 컴포넌트
const VirtualizationExample: React.FC = () => {
  // 초기 10,000 개 데이터
  // "하나의 데이터는 하나의 상태로만 관리" - React 단일 진실 공급원(Single Source of Truth) 원칙
  const [items, setItems] = useState(() => generateLargeDataset(10000));

  const ITEM_HEIGHT = 80; // 각 아이템의 높이
  const CONTAINER_HEIGHT = 600; // 컨테이너 높이
  
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const throttleTimeoutRef = useRef<number | null>(null);   // useRef 이용, 타이머 ID 저장
  // const handleScrollRef = useRef<Function | null>(null);

  console.log('scrollTop: ', scrollTop, ' items: ',items.length);
  //console.log('handleScrollRef.current: ', handleScrollRef.current);

  /**
   * 화면에 보여질 항목의 시작과 끝 인덱스 계산
   * - startIndex, endIndex, visibleItems 리턴
   * - scrollTop, items 이 변경될때마다 갱신
   * - useMemo 사용 이유:
   * 1. items.slice()는 비용이 큰 배열 연산
   * 2. scrollTop이나 items가 변경될 때만 재계산 (불필요한 재계산 방지)
   * 3. 다른 이유로 리렌더링되어도 캐시된 값 재사용
   * ⚠️ 주의: scrollTop이 변경되면 어차피 재계산됨
   *    → handleScroll에 throttle 적용하여 업데이트 빈도 제한 (16ms = 약 60fps)
   */
  const { startIndex, endIndex, visibleItems } = useMemo(() => {
    const start = Math.floor(scrollTop / ITEM_HEIGHT); // 가변, 80 === 1, floor 소수점인경우 작은수
    const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT); // 고정, ceil 소수점인경우 큰수, 현재 8
    const end = Math.min(start + visibleCount + 1, items.length); // 버퍼 추가, 가변
    
    return {
      startIndex: start,
      endIndex: end,
      visibleItems: items.slice(start, end),  // 현재 9개씩, 매번 새 배열 생성되므로 메모이제이션 필요
    };
  }, [scrollTop, items]); // 의존성: 이 두 값이 변경될 때만 재계산
  
  const totalHeight = items.length * ITEM_HEIGHT;   // 총 스크롤 길이
  const offsetY = startIndex * ITEM_HEIGHT;         // 스크롤한 길이

  /**
   * 스크롤 핸들러 : 이벤트에 따른 scrollTop 갱신
   * - Throttle 적용: 타임아웃 설정하여, 16ms(약 60fps)마다 스크롤 상태 업데이트
   * - useCallback 사용 이유:
   * 1. 컴포넌트 리렌더링 시 함수 재생성 방지 (함수 참조 동일성 유지)
   * 2. 현재는 div에 직접 연결되어 큰 효과는 없지만, 좋은 습관
   * 3. 향후 자식 컴포넌트로 전달하거나 useEffect 의존성으로 사용할 경우 중요
   */
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    
    // 이전 throttle이 실행 중이면 취소
    if (throttleTimeoutRef.current !== null) {
      return;
    }

    // console.log('handleScroll : throttleTimeoutRef.current: ', throttleTimeoutRef.current, ', newScrollTop: ', newScrollTop);

    // 스크롤 상태 업데이트
    setScrollTop(newScrollTop);
    
    // 16ms 동안 추가 업데이트 방지
    throttleTimeoutRef.current = window.setTimeout(() => {
      throttleTimeoutRef.current = null;
    }, 16); // 약 60fps
  }, []);

  // useCallback 효과 확인: 함수 참조가 변경되었는지 체크
  // if (handleScrollRef.current !== handleScroll) {
  //   console.log('🆕 handleScroll 함수가 새로 생성됨 (useCallback 없으면 매 렌더링마다 발생)');
  //   handleScrollRef.current = handleScroll;
  // } else {
  //   console.log('♻️ handleScroll 함수 재사용 (useCallback 효과)');
  // }

  // 총 데이터 개수 변경
  const handleItemCountChange = (count: number) => {
    setItems(generateLargeDataset(count));
    setScrollTop(0); // 상태도 함께 리셋
    containerRef.current?.scrollTo(0, 0);
  };

  // cleanup: 컴포넌트 언마운트 시 throttle timeout 정리
  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current !== null) {
        window.clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🚀 가상 스크롤링 (Virtualization)</h2>
        <p style={styles.description}>
          {items.length.toLocaleString()}개의 항목 중 현재 {visibleItems.length}개만 렌더링 중
          (인덱스 {startIndex} ~ {endIndex})
        </p>
      </div>

      <div style={styles.controls}>
        <button
          style={styles.button}
          onClick={() => handleItemCountChange(1000)}
        >
          1,000개
        </button>
        <button
          style={styles.button}
          onClick={() => handleItemCountChange(10000)}
        >
          10,000개
        </button>
        <button
          style={styles.button}
          onClick={() => handleItemCountChange(100000)}
        >
          100,000개
        </button>
      </div>

      <div
        ref={containerRef}
        style={{
          ...styles.scrollContainer,
          height: CONTAINER_HEIGHT,
        }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: offsetY,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((item, _) => (
              <div
                key={item.id}
                style={{
                  ...styles.item,
                  height: ITEM_HEIGHT,
                }}
              >
                <div style={styles.itemId}>#{item.id}</div>
                <div style={styles.itemContent}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemDetails}>
                    {item.email} · {item.age}세 · {item.city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.info}>
        <h3 style={styles.infoTitle}>💡 가상 스크롤링이란?</h3>
        <ul style={styles.infoList}>
          <li style={{ textAlign: 'left' }}>대용량 리스트에서 <strong>화면에 보이는 항목만</strong> 실제로 렌더링</li>
          <li style={{ textAlign: 'left' }}>DOM 노드 수를 최소화하여 <strong>메모리 사용량 감소</strong></li>
          <li style={{ textAlign: 'left' }}>스크롤 성능 향상 및 <strong>초기 렌더링 시간 단축</strong></li>
          <li style={{ textAlign: 'left' }}>실제 프로젝트에서는 react-window, react-virtualized 라이브러리 사용 권장</li>
        </ul>
        
        <h3 style={styles.infoTitle}>🎯 사용 사례</h3>
        <ul style={styles.infoList}>
          <li style={{ textAlign: 'left' }}>수천 개 이상의 항목을 가진 리스트</li>
          <li style={{ textAlign: 'left' }}>실시간 로그 뷰어, 채팅 메시지 목록</li>
          <li style={{ textAlign: 'left' }}>대용량 테이블, 데이터 그리드</li>
          <li style={{ textAlign: 'left' }}>무한 스크롤과 함께 사용</li>
        </ul>
        
        <h3 style={styles.infoTitle}>⚡ 성능 최적화 기법</h3>
        <ul style={styles.infoList}>
          <li style={{ textAlign: 'left' }}><strong>useMemo</strong>: items.slice() 같은 비용 큰 계산을 캐싱 (의존성 변경 시에만 재계산)</li>
          <li style={{ textAlign: 'left' }}><strong>useCallback</strong>: 함수 참조 동일성 유지 (매 렌더링마다 함수 재생성 방지)</li>
          <li style={{ textAlign: 'left' }}><strong>Throttle</strong>: 스크롤 이벤트를 16ms(60fps)로 제한하여 과도한 리렌더링 방지</li>
          <li style={{ textAlign: 'left' }}>스크롤 이벤트는 초당 60~100회 발생 → throttle 없이는 매우 비효율적</li>
          <li style={{ textAlign: 'left' }}>콘솔에서 함수 재사용 여부 확인 가능 (♻️ = 재사용, 🆕 = 새로 생성)</li>
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    backgroundColor: '#f0f9ff',
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #0ea5e9',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  scrollContainer: {
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'auto',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    borderBottom: '1px solid #f3f4f6',
    gap: '15px',
    backgroundColor: '#fff',
  },
  itemId: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#6366f1',
    minWidth: '80px',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px',
  },
  itemDetails: {
    fontSize: '13px',
    color: '#6b7280',
  },
  info: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#374151',
  },
  infoList: {
    marginLeft: '20px',
    marginBottom: '15px',
    lineHeight: '1.8',
    color: '#4b5563',
  },
};

export default VirtualizationExample;
