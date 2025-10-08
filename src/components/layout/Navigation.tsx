import Button from '../common/Button';

/**
 * Navigation 컴포넌트의 props 타입 정의
 */
interface NavigationProps {
  currentExample: string;
  onExampleChange: (example: string) => void;
}

/**
 * Navigation 컴포넌트의 item 타입 정의
 */
interface NavItem {
  id: string;
  label: string;
  category: string;
}

/**
 * item 데이터 정의
 */
const navigationItems: NavItem[] = [
  { id: 'state', label: 'useState 기본', category: 'basics' },
  { id: 'effect', label: 'useEffect 기본', category: 'basics' },
  { id: 'context', label: 'Context 기본', category: 'basics' },
  { id: 'auth-context', label: '인증 Context', category: 'basics' },
  { id: 'actions', label: 'Actions (React 19)', category: 'react19' },
  { id: 'optimistic', label: 'Optimistic Updates', category: 'react19' },
  { id: 'form-status', label: 'useFormStatus', category: 'react19' },
  { id: 'use-hook', label: 'use 훅', category: 'react19' },
  { id: 'react-compiler', label: 'React Compiler', category: 'react19' },
  { id: 'custom-hooks', label: '커스텀 훅', category: 'hooks' },
];

/**
 * 카테고리 키에 대한 문자열 라벨 정의
 */
const categoryLabels: Record<string, string> = {
  basics: '기본 개념',
  react19: 'React 19 새 기능',
  hooks: '커스텀 훅',
  patterns: '리액트 패턴',
  advanced: '고급 개념'
};

/**
 * 학습 예제 네비게이션 컴포넌트
 */
/**
 * Renders a navigation component that displays categorized example buttons.
 * Allows users to switch between different examples by clicking on the buttons.
 *
 * @param {Object} props - The properties object for the navigation component.
 * @param {number|string} props.currentExample - The ID of the currently selected example.
 * @param {Function} props.onExampleChange - Callback function to handle example change.
 *        Receives the ID of the selected example as an argument.
 * @return {JSX.Element} A navigation component populated with categorized buttons for example navigation.
 */
export default function Navigation({ currentExample, onExampleChange }: NavigationProps) {
  // navigationItems 의 category를 추출하여 중복을 제거한 후 categories 배열 생성
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
          <h2 style={{
            margin: '0 0 10px 0', 
            color: '#666',
            textTransform: 'capitalize',
            fontSize: '18px',
            fontWeight: '800'
          }}>
            {getCategoryLabel(category)}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {navigationItems
              .filter(item => item.category === category)
              .map(item => (
                <Button size='medium'
                  key={item.id}
                  onClick={() => onExampleChange(item.id)}
                  style={{
                    backgroundColor : (currentExample === item.id) ? '#007bff' : 'white',
                    color : (currentExample === item.id) ? 'white' : '#333',
                  }}
                >
                  {item.label}
                </Button>
              ))
            }
          </div>
        </div>
      ))}
    </nav>
  );
}

/**
 * 카테고리 키에 대한 문자열 라벨 반환
 * Retrieves the label for a given category.
 *
 * @param {string} category - The key representing the category.
 * @return {string} The corresponding label for the category. If the key is not found, it returns the original key.
 */
function getCategoryLabel(category: string): string {
  return categoryLabels[category] || category;
}