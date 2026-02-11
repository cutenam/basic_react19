/**
 * 대용량 데이터 처리 패턴 메인 페이지
 * 
 * React에서 대용량 데이터를 효율적으로 처리하는 6가지 패턴을 학습
 * - 기본 패턴 4가지 + 라이브러리 활용 2가지
 */

import React, { useState } from 'react';
import VirtualizationExample from './VirtualizationExample.tsx';
import PaginationExample from './PaginationExample.tsx';
import InfiniteScrollExample from './InfiniteScrollExample.tsx';
import SearchOptimizationExample from './SearchOptimizationExample.tsx';
import ReactWindowExample from './ReactWindowExample.tsx';
import ReactVirtualizedExample from './ReactVirtualizedExample.tsx';

type PatternType = 'overview' | 'virtualization' | 'pagination' | 'infinite-scroll' | 'search-optimization' | 'react-window' | 'react-virtualized';

interface Pattern {
  id: PatternType;
  title: string;
  description: string;
  icon: string;
  color: string;
  component: React.FC;
}

const patterns: Pattern[] = [
  {
    id: 'virtualization',
    title: '가상 스크롤링',
    description: '화면에 보이는 항목만 렌더링하여 대용량 리스트의 성능을 최적화',
    icon: '🚀',
    color: '#3b82f6',
    component: VirtualizationExample,
  },
  {
    id: 'pagination',
    title: '페이지네이션',
    description: '데이터를 페이지 단위로 나누어 표시하고 탐색',
    icon: '📄',
    color: '#10b981',
    component: PaginationExample,
  },
  {
    id: 'infinite-scroll',
    title: '무한 스크롤',
    description: '스크롤 시 자동으로 다음 데이터를 로드하는 끊김 없는 UX',
    icon: '♾️',
    color: '#f59e0b',
    component: InfiniteScrollExample,
  },
  {
    id: 'search-optimization',
    title: '검색 최적화',
    description: 'Debouncing과 Throttling으로 검색 성능 향상',
    icon: '⚡',
    color: '#ef4444',
    component: SearchOptimizationExample,
  },
  {
    id: 'react-window',
    title: 'react-window',
    description: '경량화된 가상 스크롤링 라이브러리 (권장)',
    icon: '🪟',
    color: '#3b82f6',
    component: ReactWindowExample,
  },
  {
    id: 'react-virtualized',
    title: 'react-virtualized',
    description: '풍부한 기능의 가상 스크롤링 라이브러리',
    icon: '🎨',
    color: '#f59e0b',
    component: ReactVirtualizedExample,
  },
];

const LargeDataPatternsExample: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<PatternType>('overview');

  const SelectedComponent = patterns.find((p) => p.id === selectedPattern)?.component;

  if (selectedPattern === 'overview') {
    return (
      <div style={styles.container}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>📊 대용량 데이터 처리 패턴</h1>
          <p style={styles.heroSubtitle}>
            React에서 수천, 수만 개의 데이터를 효율적으로 처리하는 방법을 학습하세요
          </p>
        </div>

        <div style={styles.grid}>
          {patterns.map((pattern) => (
            <div
              key={pattern.id}
              style={{
                ...styles.card,
                borderColor: pattern.color,
              }}
              onClick={() => setSelectedPattern(pattern.id)}
            >
              <div style={styles.cardIcon}>{pattern.icon}</div>
              <h3 style={{ ...styles.cardTitle, color: pattern.color }}>
                {pattern.title}
              </h3>
              <p style={styles.cardDescription}>{pattern.description}</p>
              <button
                style={{
                  ...styles.cardButton,
                  backgroundColor: pattern.color,
                }}
              >
                예제 보기 →
              </button>
            </div>
          ))}
        </div>

        <div style={styles.infoSection}>
          <h2 style={styles.infoTitle}>🎯 왜 대용량 데이터 처리가 중요한가?</h2>
          
          <div style={styles.problemSolution}>
            <div style={styles.problemBox}>
              <h3 style={styles.problemTitle}>❌ 최적화 없이 대용량 데이터를 렌더링하면</h3>
              <ul style={styles.problemList}>
                <li>수천 개의 DOM 노드 생성으로 <strong>메모리 사용량 급증</strong></li>
                <li>초기 렌더링 시간이 매우 <strong>길어짐</strong></li>
                <li>스크롤, 검색 등의 <strong>인터랙션이 느려짐</strong></li>
                <li>브라우저가 <strong>멈추거나 크래시</strong> 발생 가능</li>
                <li>모바일 기기에서 특히 심각한 성능 저하</li>
              </ul>
            </div>

            <div style={styles.solutionBox}>
              <h3 style={styles.solutionTitle}>✅ 최적화 패턴을 적용하면</h3>
              <ul style={styles.solutionList}>
                <li>필요한 만큼만 렌더링하여 <strong>메모리 효율적</strong></li>
                <li><strong>빠른 초기 로딩</strong>과 부드러운 스크롤</li>
                <li>수십만 개의 데이터도 <strong>쾌적하게 처리</strong></li>
                <li>사용자 경험 향상 및 <strong>이탈률 감소</strong></li>
                <li>모든 디바이스에서 <strong>일관된 성능</strong></li>
              </ul>
            </div>
          </div>

          <h2 style={styles.infoTitle}>🔍 어떤 패턴을 선택해야 할까?</h2>
          
          <div style={styles.comparisonTable}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>패턴</th>
                  <th style={styles.th}>적합한 상황</th>
                  <th style={styles.th}>장점</th>
                  <th style={styles.th}>단점</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tr}>
                  <td style={styles.td}><strong>🚀 가상 스크롤링</strong></td>
                  <td style={styles.td}>수만 개 이상의 리스트 항목</td>
                  <td style={styles.td}>최고의 성능, 무제한 데이터 처리</td>
                  <td style={styles.td}>구현 복잡도 높음, 항목 높이 일정해야 함</td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}><strong>📄 페이지네이션</strong></td>
                  <td style={styles.td}>검색 결과, 관리자 테이블</td>
                  <td style={styles.td}>구현 간단, SEO 유리, 특정 위치 접근 쉬움</td>
                  <td style={styles.td}>연속적인 탐색에 불편함</td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}><strong>♾️ 무한 스크롤</strong></td>
                  <td style={styles.td}>소셜 미디어 피드, 이미지 갤러리</td>
                  <td style={styles.td}>끊김 없는 UX, 모바일 친화적</td>
                  <td style={styles.td}>Footer 접근 어려움, SEO 불리</td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}><strong>⚡ 검색 최적화</strong></td>
                  <td style={styles.td}>실시간 검색, 자동완성</td>
                  <td style={styles.td}>불필요한 API 호출 감소, 성능 향상</td>
                  <td style={styles.td}>즉각적인 반응성 약간 감소</td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}><strong>🪟 react-window</strong></td>
                  <td style={styles.td}>새 프로젝트, 간단한 리스트</td>
                  <td style={styles.td}>매우 작은 번들, 간단한 API, 활발한 유지보수</td>
                  <td style={styles.td}>기능이 제한적 (의도적 설계)</td>
                </tr>
                <tr style={styles.tr}>
                  <td style={styles.td}><strong>🎨 react-virtualized</strong></td>
                  <td style={styles.td}>복잡한 테이블, 그리드</td>
                  <td style={styles.td}>풍부한 기능, 동적 크기 측정, 특수 레이아웃</td>
                  <td style={styles.td}>큰 번들 크기, 복잡한 API</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={styles.infoTitle}>💡 실무 적용 팁</h2>
          <ul style={styles.tipsList}>
            <li><strong>패턴을 조합하세요</strong>: 가상 스크롤링 + 무한 스크롤, 페이지네이션 + 검색 최적화 등</li>
            <li><strong>라이브러리 우선 고려</strong>: 직접 구현보다 react-window (권장) 또는 react-virtualized 사용</li>
            <li><strong>프로젝트 선택 기준</strong>: 새 프로젝트는 react-window, 복잡한 UI는 react-virtualized</li>
            <li><strong>서버 사이드 처리</strong>: 가능하면 서버에서 필터링, 정렬, 페이지네이션 수행</li>
            <li><strong>캐싱 전략</strong>: React Query, SWR로 이미 로드한 데이터 캐싱</li>
            <li><strong>로딩 상태 표시</strong>: 스켈레톤 UI, 프로그레스 바로 UX 개선</li>
            <li><strong>에러 처리</strong>: 네트워크 오류, 타임아웃 등을 적절히 처리</li>
          </ul>

          <div style={styles.cta}>
            <p style={styles.ctaText}>각 패턴의 상세 예제를 확인하고 직접 테스트해보세요!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.exampleContainer}>
      <div style={styles.breadcrumb}>
        <button style={styles.backButton} onClick={() => setSelectedPattern('overview')}>
          ← 패턴 목록으로 돌아가기
        </button>
      </div>
      {SelectedComponent && <SelectedComponent />}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '40px 20px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    color: '#fff',
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.95,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '60px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '32px 24px',
    borderRadius: '12px',
    border: '3px solid',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textAlign: 'center',
  },
  cardIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '20px',
    minHeight: '60px',
  },
  cardButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  infoSection: {
    backgroundColor: '#f9fafb',
    padding: '40px',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
  },
  infoTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginTop: '40px',
    marginBottom: '20px',
    color: '#111827',
  },
  problemSolution: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  problemBox: {
    backgroundColor: '#fef2f2',
    padding: '24px',
    borderRadius: '12px',
    border: '2px solid #fecaca',
  },
  problemTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: '16px',
  },
  problemList: {
    marginLeft: '20px',
    lineHeight: '2',
    color: '#7f1d1d',
  },
  solutionBox: {
    backgroundColor: '#f0fdf4',
    padding: '24px',
    borderRadius: '12px',
    border: '2px solid #bbf7d0',
  },
  solutionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: '16px',
  },
  solutionList: {
    marginLeft: '20px',
    lineHeight: '2',
    color: '#14532d',
  },
  comparisonTable: {
    overflowX: 'auto',
    marginBottom: '40px',
  },
  table: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
  },
  th: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '2px solid #e5e7eb',
  },
  tr: {
    borderBottom: '1px solid #f3f4f6',
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6',
  },
  tipsList: {
    marginLeft: '20px',
    lineHeight: '2',
    color: '#374151',
    fontSize: '15px',
  },
  cta: {
    marginTop: '40px',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    textAlign: 'center',
    border: '2px dashed #d1d5db',
  },
  ctaText: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151',
  },
  exampleContainer: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  breadcrumb: {
    padding: '20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563',
    backgroundColor: '#fff',
    border: '2px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export default LargeDataPatternsExample;
