import { ReactNode } from 'react';

interface NavigationProps {
  currentExample: string;
  onExampleChange: (example: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  category: string;
}

const navigationItems: NavItem[] = [
  { id: 'state', label: 'useState 기본', category: 'basics' },
  { id: 'effect', label: 'useEffect 기본', category: 'basics' },
  { id: 'actions', label: 'Actions (React 19)', category: 'react19' },
  { id: 'optimistic', label: 'Optimistic Updates', category: 'react19' },
  { id: 'custom-hooks', label: '커스텀 훅', category: 'hooks' },
];

/**
 * 학습 예제 네비게이션 컴포넌트
 */
export default function Navigation({ currentExample, onExampleChange }: NavigationProps) {
  const categories = Array.from(new Set(navigationItems.map(item => item.category)));

  return (
    <nav style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px', 
      marginBottom: '20px' 
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
        React 19 학습 예제
      </h2>
      
      {categories.map(category => (
        <div key={category} style={{ marginBottom: '15px' }}>
          <h4 style={{ 
            margin: '0 0 10px 0', 
            color: '#666',
            textTransform: 'capitalize',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {getCategoryLabel(category)}
          </h4>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {navigationItems
              .filter(item => item.category === category)
              .map(item => (
                <button
                  key={item.id}
                  onClick={() => onExampleChange(item.id)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    backgroundColor: currentExample === item.id ? '#007bff' : 'white',
                    color: currentExample === item.id ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: '13px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.label}
                </button>
              ))
            }
          </div>
        </div>
      ))}
    </nav>
  );
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    basics: '기본 개념',
    react19: 'React 19 새 기능',
    hooks: '커스텀 훅',
    patterns: '리액트 패턴',
    advanced: '고급 개념'
  };
  
  return labels[category] || category;
}
