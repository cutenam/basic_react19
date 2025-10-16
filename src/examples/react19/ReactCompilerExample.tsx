import React, { useState } from 'react';
import { useTranslation} from "react-i18next";

/**
 * React Compiler (자동 최적화) 예제
 * 
 * React 19의 React Compiler는 빌드 타임에 코드를 분석하여
 * 자동으로 메모이제이션을 적용하고 불필요한 리렌더링을 방지합니다.
 * 
 * 주요 특징:
 * 1. 자동 메모이제이션 - useMemo/useCallback 불필요
 * 2. 의존성 배열 관리 자동화
 * 3. 컴파일 타임 최적화
 * 4. 성능 향상 자동화
 */


// 메모이제이션 컴포넌트 props 타입 정의
interface ExpensiveItemProps {
  value: number;
  onClick: () => void;
}

/**
 *
 * 1. 기존 방식 최적화 자식 컴포넌트 (수동 최적화)
 * - React.memo : 컴포넌트 메모이제이션 사용
 * - useCallback 로 래핑한 콜백 함수가 클릭되어, 부모컴포넌트의 state 가 변경되어도 자식 컴포넌트는 리렌더링 되지 않는다.
 *
 * A React memoized component specifically designed for demonstrating and handling expensive computations.
 * The `ExpensiveItemOld` component simulates a heavy calculation, displaying the result and providing
 * a button for triggering a click handler. This component is optimized using `React.memo` to prevent unnecessary
 * re-renders when parent props or other parts of the application are updated.
 *
 */
const ExpensiveItemOld = React.memo(({ value, onClick }: ExpensiveItemProps) => {
  const {t} = useTranslation();

  // 무거운 계산 시뮬레이션
  const expensiveCalculation = (num: number) => {
    console.log('🔄 [React.memo] 무거운 계산 실행...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num;
    }
    return result;
  };

  const result = expensiveCalculation(value);

  return (
    <div style={{ 
      padding: '16px', 
      backgroundColor: '#eff6ff', 
      borderRadius: '8px', 
      border: '1px solid #bfdbfe' 
    }}>
      <p style={{ fontSize: '14px', color: '#4b5563' }}>{t('features.reactCompiler.label.resultHeavyComputation')}: {result}</p>
      <button
        onClick={onClick}
        style={{
          marginTop: '8px',
          padding: '4px 12px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
      >
        {t('features.reactCompiler.label.childCounter')}
      </button>
      <p style={{ fontSize: '12px', color: '#4b5563', textAlign: 'left' }}>
        {`💡 ${t('features.reactCompiler.description.textHeavyComputation1')}`}
      </p>
    </div>
  );
});

/**
 *
 * 2. React Compiler 방식 자식 컴포넌트 (자동 최적화)
 *
 * - React Compiler 사용 시: React.memo 불필요
 * - 컴파일러가 자동으로 최적화 적용 : babel-plugin-react-compiler 플러그인
 *
 * `ExpensiveItemNew` is a React functional component that simulates a computationally
 * expensive calculation and demonstrates React Compiler's automatic memoization optimization.
 *
 * This component calculates a "heavy computation result" based on the given `value`
 * and renders the result in the UI. It also includes a button to trigger the `onClick` callback
 * and demonstrates that React Compiler prevents unnecessary re-rendering of the component.
 *
 * The component is styled with inline styles to provide a visually distinct appearance.
 * It also implements hover effects on the button for better user interaction.
 *
 */
const ExpensiveItemNew = ({ value, onClick }: ExpensiveItemProps) => {
  const {t} = useTranslation();
  // 무거운 계산 시뮬레이션
  const expensiveCalculation = (num: number) => {
    console.log('✨ [Compiler 방식] 무거운 계산 실행...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num;
    }
    return result;
  };

  // React Compiler가 자동으로 메모이제이션 적용
  const result = expensiveCalculation(value);

  return (
    <div style={{ 
      padding: '16px', 
      backgroundColor: '#fae3d7',
      borderRadius: '8px', 
      border: '1px solid #DDC6BA'
    }}>
      <p style={{ fontSize: '14px', color: '#4b5563' }}>{t('features.reactCompiler.label.resultHeavyComputation')}: {result}</p>
      <button
        onClick={onClick}
        style={{
          marginTop: '8px',
          padding: '4px 12px',
          backgroundColor: '#ef6c27',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D66B27'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef6c27'}
      >
        {t('features.reactCompiler.label.childCounter')}
      </button>
      <p style={{ fontSize: '12px', color: '#4b5563', textAlign: 'left' }}>
        {`💡 ${t('features.reactCompiler.description.textHeavyComputation2')}`}
      </p>
    </div>
  );
};

/**
 * 1. 기존 방식 최적화 부모 컴포넌트
 * - React.memo, React.useCallback 를 이용하여, 렌더링 최적화
 * - useCallback : 함수 메모이제이션, 부모 컴포넌트의 state 값의 변경에 자식 컴포넌트가 리렌더링 영향을 받지 않도록 함
 *
 * A React component `ManualOptimizationDemo` demonstrating manual optimization techniques such as
 * the use of `React.memo` and `useCallback` for preventing unnecessary re-renders in child components.
 * It compares the difference in behavior when using a memoized callback versus a non-memoized callback.
 *
 * Variables and functions:
 * - `count`: Represents a counter value controlled by the state.
 * - `setCount`: Updates the `count` state variable.
 * - `itemValue`: Represents a static value passed to the child component.
 * - `setItemValue`: State setter for `itemValue`, although currently not directly modified in the component.
 * - `handleClickUseCallback`: A memoized callback function created with `useCallback` which updates the `count`.
 * - `handleClickWithout`: A non-memoized callback function which also updates the `count`.
 *
 * Return:
 * - Renders a container with two key sections.
 * - One section demonstrates counting functionality with a non-memoized callback.
 * - Another section uses a child component, `ExpensiveItemOld`, with a memoized callback to showcase optimization.
 */
const ManualOptimizationDemo = () => {
  const [count, setCount] = useState(0);
  const [itemValue, setItemValue] = useState(100);
  const {t} = useTranslation();

  // ✅ useCallback 메모이제이션 : [] 의존성 배열 값의 변화에 따라 새로운 함수 생성(추가적인 함수가 생성됨, 메모리 할당됨)
  const handleClickUseCallback = React.useCallback(() => {
    console.log('콜백 카운터 클릭');
    setCount(prev => prev + 1);
  }, []);

  // ❌ useCallback 없음: 매 렌더링마다 새로운 함수 생성
  const handleClickWithout = () => {
    console.log('부모 카운터 클릭');
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ 
        backgroundColor: '#fefce8', 
        padding: '16px', 
        borderRadius: '8px', 
        border: '1px solid #fde047' 
      }}>
        <h4 style={{ fontWeight: '600', color: '#854d0e', marginBottom: '8px' }}>{`🔧 ${t('features.reactCompiler.heading.titleManualOptimize')}`}</h4>
        <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
          {t('features.reactCompiler.label.textManualOptimize')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '14px' }}>{t('common.count')} : {count}</p>
          <button
            onClick={handleClickWithout}
            style={{
              padding: '4px 12px',
              backgroundColor: '#eab308',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              alignSelf: 'center',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ca8a04'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eab308'}
          >
            {t('features.reactCompiler.label.parentCounter')}
          </button>
        </div>
      </div>
      <ExpensiveItemOld value={itemValue} onClick={handleClickUseCallback} />
    </div>
  );
};

/**
 *
 * 2. Compiler 방식 최적화 부모 컴포넌트
 *
 * Represents a React functional component designed to demonstrate optimization techniques
 * applied by the React Compiler during rendering processes.
 *
 * This component showcases how to handle state updates and optimize callback functions
 * without the explicit use of React's `useCallback` hook due to automatic memoization
 * provided by the React Compiler.
 *
 * Features:
 * - Displays a counter and provides buttons to increment the counter.
 * - Demonstrates React Compiler's ability to optimize callback functions, reducing unnecessary re-renders.
 * - Contains interactive elements styled for a responsive user experience.
 *
 * Functions:
 * - `handleClickNew`: Callback function invoked to update the counter when interacting with a child component.
 *   Automatically memoized by the React Compiler.
 * - `handleClick`: Regular callback function to update the counter when triggered by user interaction.
 *
 * Dependencies:
 * - React's `useState` for managing component state.
 * - A child component named `ExpensiveItemNew` to test optimizations with callbacks.
 */
const CompilerOptimizationDemo = () => {
  const [count, setCount] = useState(0);
  const [itemValue, setItemValue] = useState(100);
  const {t} = useTranslation();

  // React Compiler 사용 시: useCallback 불필요!
  // 컴파일러가 자동으로 함수를 메모이제이션
  const handleClickNew = () => {
    console.log('콜백 카운터 클릭');
    setCount(prev => prev+1);
  };

  const handleClick = () => {
    console.log('부모 카운터 클릭');
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ 
        backgroundColor: '#f0fdf4', 
        padding: '16px', 
        borderRadius: '8px', 
        border: '1px solid #bbf7d0' 
      }}>
        <h4 style={{ fontWeight: '600', color: '#166534', marginBottom: '8px' }}>{`✨ ${t('features.reactCompiler.heading.titleAutoOptimize')}`}</h4>
        <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
          {t('features.reactCompiler.label.textAutoOptimize')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '14px' }}>{t('common.count')} : {count}</p>
          <button
            onClick={handleClick}
            style={{
              padding: '4px 12px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              alignSelf: 'center',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
          >
            {t('features.reactCompiler.label.parentCounter')}
          </button>
        </div>
      </div>
      <ExpensiveItemNew value={itemValue} onClick={handleClickNew} />
    </div>
  );
};


/**
 * 3. React Compiler 설정 방법
 *
 * Renders a styled informational component that provides step-by-step
 * guidance on configuring a React Compiler.
 *
 * This component includes instructions for integrating a React Compiler
 * with various tools and environments such as Babel, Vite, and Next.js.
 * Each step is displayed with headings, code snippets, and styling for
 * readability.
 *
 * Key Features:
 * - Explanation of installation and setup for `babel-plugin-react-compiler`.
 * - Detailed instructions for configuring Babel, Vite, and Next.js.
 * - Styled sections for improved clarity and syntax-highlighted code blocks.
 */
const CompilerConfigExample = () => {
  const {t} = useTranslation();

  return (
    <div style={{ 
      backgroundColor: '#f9fafb', 
      padding: '24px', 
      borderRadius: '8px', 
      border: '1px solid #e5e7eb' 
    }}>
      <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>{`⚙️ ${t('features.reactCompiler.heading.titleGuidelineReactComplier')}`}</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h5 style={{ fontWeight: '500', fontSize: '14px', marginBottom: '8px', textAlign: 'left' }}>{t('features.reactCompiler.label.guidelineReactComplier1')}</h5>
          <pre style={{ 
            backgroundColor: '#1f2937', 
            color: '#4ade80', 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            overflowX: 'auto',
            textAlign: 'left'
          }}>
{`npm install -D babel-plugin-react-compiler
# 또는
yarn add -D babel-plugin-react-compiler`}
          </pre>
        </div>

        <div>
          <h5 style={{ fontWeight: '500', fontSize: '14px', marginBottom: '8px', textAlign: 'left' }}>{t('features.reactCompiler.label.guidelineReactComplier2')}</h5>
          <pre style={{ 
            backgroundColor: '#1f2937', 
            color: '#4ade80', 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            overflowX: 'auto',
            textAlign: 'left'
          }}>
{`module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      // 옵션
      runtimeModule: 'react-compiler-runtime'
    }]
  ]
}`}
          </pre>
        </div>

        <div>
          <h5 style={{ fontWeight: '500', fontSize: '14px', marginBottom: '8px', textAlign: 'left' }}>{t('features.reactCompiler.label.guidelineReactComplier3')}</h5>
          <pre style={{ 
            backgroundColor: '#1f2937', 
            color: '#4ade80', 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            overflowX: 'auto',
            textAlign: 'left'
          }}>
{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {}]
        ]
      }
    })
  ]
})`}
          </pre>
        </div>

        <div>
          <h5 style={{ fontWeight: '500', fontSize: '14px', marginBottom: '8px', textAlign: 'left' }}>{t('features.reactCompiler.label.guidelineReactComplier4')}</h5>
          <pre style={{ 
            backgroundColor: '#1f2937', 
            color: '#4ade80', 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            overflowX: 'auto',
            textAlign: 'left'
          }}>
{`module.exports = {
  experimental: {
    reactCompiler: true
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

/**
 *
 * 4. 최적화 적용시 주의사항
 *
 * A functional React component that displays a grid layout containing two sections:
 * one for highlighting key benefits and another for detailing caveats or warnings.
 *
 * The first section lists advantages such as automatic optimization, improved performance,
 * and simplified code management. The second section provides cautionary notes
 * about potential challenges including stability, build time, debugging, compatibility, and learning curve.
 *
 * Styling is applied inline for a responsive layout and aesthetic design. Each section
 * is visually distinct with different background colors and borders to differentiate
 * between benefits and caveats.
 *
 * The component is designed to be functional and informative for developers to
 * understand specific advantages and trade-offs associated with certain features or tools.
 */
const BenefitsAndCaveats = () => {
  const {t} = useTranslation();
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '24px' 
    }}>
      <div style={{ 
        backgroundColor: '#f0fdf4', 
        padding: '24px', 
        borderRadius: '8px', 
        border: '1px solid #bbf7d0' 
      }}>
        <h4 style={{ fontWeight: '600', color: '#166534', marginBottom: '16px' }}>{`✅ ${t('features.reactCompiler.heading.titleAdvantage')}`}</h4>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#374151' }}>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.advantage1')}:</strong> {t('features.reactCompiler.description.textAdvantage1')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.advantage2')}:</strong> {t('features.reactCompiler.description.textAdvantage2')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.advantage3')}:</strong> {t('features.reactCompiler.description.textAdvantage3')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.advantage4')}:</strong> {t('features.reactCompiler.description.textAdvantage4')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.advantage5')}:</strong> {t('features.reactCompiler.description.textAdvantage5')}
          </li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#fff7ed', 
        padding: '24px', 
        borderRadius: '8px', 
        border: '1px solid #fed7aa' 
      }}>
        <h4 style={{ fontWeight: '600', color: '#9a3412', marginBottom: '16px' }}>{`⚠️ ${t('features.reactCompiler.heading.titleCautions')}`}</h4>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#374151' }}>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.caution1')}:</strong> {t('features.reactCompiler.description.textCaution1')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.caution2')}:</strong> {t('features.reactCompiler.description.textCaution2')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.caution3')}:</strong> {t('features.reactCompiler.description.textCaution3')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.caution4')}:</strong> {t('features.reactCompiler.description.textCaution4')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.caution5')}:</strong> {t('features.reactCompiler.description.textCaution5')}
          </li>
        </ul>
      </div>
    </div>
  );
};

/**
 * 렌더링 최적화 방법 비교를 위한 메인 컴포넌트
 *
 * ReactCompilerExample component provides an interactive demonstration and explanation
 * of the React Compiler introduced in React 19 for automatic build-time optimizations.
 *
 * Features include:
 * - Descriptions and comparisons of manual and compiler-based optimization approaches
 * - Interactive tab navigation for learning key concepts, configurations, and benefits
 * - Practical guides to understand and compare optimization behaviors
 * - Visual explanation of how the compiler analyzes and optimizes code
 *
 * State:
 * - `activeTab`: Controls which tab content is displayed. Possible values are 'manual', 'compiler', 'config', or 'benefits'.
 *
 * Main Concepts Demonstrated:
 * - The role of React Compiler in automating memoization (e.g., useMemo, useCallback, React.memo)
 * - Methods to configure and leverage React Compiler for performance improvements
 * - The benefits and considerations of using the React Compiler in real-world applications
 *
 * Usage:
 * - Click on tab buttons to navigate between different optimization approaches and guides.
 * - Observe corresponding content and demonstrations for a deeper understanding of React Compiler functionality.
 */
const ReactCompilerExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'compiler' | 'config' | 'benefits'>('manual');
  const {t, i18n} = useTranslation();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          {`⚡ ${t('features.reactCompiler.title')}`}
        </h1>
        <p style={{ color: '#4b5563' }}>
          {t('features.reactCompiler.description.textExplainSample')}
        </p>
      </div>

      {/* 개념 설명 */}
      <div style={{ backgroundColor: '#eff6ff', padding: '24px', borderRadius: '8px', border: '1px solid #bfdbfe', marginBottom: '32px' }}>
        <h3 style={{ fontWeight: '600', color: '#1e3a8a', marginBottom: '12px' }}>{`📚 ${t('features.reactCompiler.heading.titleCoreConcept')}`}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px', color: '#374151' }}>
          <p style={{ textAlign: 'left'}}>
            {t('features.reactCompiler.description.textCoreConcept1')}
          </p>
          <ul style={{ marginTop: 0}}>
            <li style={{ textAlign: 'left' }}>
              <strong>{t('features.reactCompiler.heading.titleManualOptimize')}:</strong> {t('features.reactCompiler.description.textCoreConcept2')}
            </li>
            <li style={{ textAlign: 'left' }}>
              <strong>{t('features.reactCompiler.heading.titleAutoOptimize')}:</strong> {t('features.reactCompiler.description.textCoreConcept3')}
            </li>
          </ul>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <button
          onClick={() => setActiveTab('manual')}
          style={{
            padding: '8px 16px',
            fontWeight: '500',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'manual' ? '2px solid #2563eb' : 'none',
            color: activeTab === 'manual' ? '#2563eb' : '#4b5563',
            cursor: 'pointer'
          }}
        >
          {t('features.reactCompiler.heading.titleManualOptimize')}
        </button>
        <button
          onClick={() => setActiveTab('compiler')}
          style={{
            padding: '8px 16px',
            fontWeight: '500',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'compiler' ? '2px solid #2563eb' : 'none',
            color: activeTab === 'compiler' ? '#2563eb' : '#4b5563',
            cursor: 'pointer'
          }}
        >
          {t('features.reactCompiler.heading.titleAutoOptimize')}
        </button>
        <button
          onClick={() => setActiveTab('config')}
          style={{
            padding: '8px 16px',
            fontWeight: '500',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'config' ? '2px solid #2563eb' : 'none',
            color: activeTab === 'config' ? '#2563eb' : '#4b5563',
            cursor: 'pointer'
          }}
        >
          {t('features.reactCompiler.heading.titleGuidelineReactComplier')}
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          style={{
            padding: '8px 16px',
            fontWeight: '500',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'benefits' ? '2px solid #2563eb' : 'none',
            color: activeTab === 'benefits' ? '#2563eb' : '#4b5563',
            cursor: 'pointer'
          }}
        >
          {t('features.reactCompiler.heading.titleAdvantageCautions')}
        </button>
      </div>

      {/* 탭 컨텐츠 */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '24px' }}>
        {activeTab === 'manual' && <ManualOptimizationDemo />}
        {activeTab === 'compiler' && <CompilerOptimizationDemo />}
        {activeTab === 'config' && <CompilerConfigExample />}
        {activeTab === 'benefits' && <BenefitsAndCaveats />}
      </div>

      {/* 추가 정보 */}
      <div style={{ marginTop: '32px', backgroundColor: '#faf5ff', padding: '24px', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
        <h3 style={{ fontWeight: '600', color: '#581c87', marginBottom: '12px' }}>{`🔍 ${t('features.reactCompiler.heading.titleHowItWorks')}`}</h3>
        <ol style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#374151', alignItems: 'start', padding: '0 30px 0' }}>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.howItWorks1')} : </strong> {t('features.reactCompiler.description.textHowItWorks1')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.howItWorks2')} : </strong> {t('features.reactCompiler.description.textHowItWorks2')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.howItWorks3')} : </strong> {t('features.reactCompiler.description.textHowItWorks3')}
          </li>
          <li style={{ textAlign: 'left' }}>
            <strong>{t('features.reactCompiler.label.howItWorks4')} : </strong> {t('features.reactCompiler.description.textHowItWorks4')}
          </li>
        </ol>
      </div>

      {/* 실습 가이드 */}
      <div style={{
        marginTop: '32px',
        backgroundColor: '#f9fafb',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{fontWeight: '600', color: '#111827', marginBottom: '12px'}}>{`💡 ${t('features.reactCompiler.heading.titleGuidelineTest')}`}</h3>
        <ol style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '14px',
          color: '#374151',
          alignItems: 'start',
          padding: '0 30px 0'
        }}>
          <li>{t('features.reactCompiler.description.textGuidelineTest1')}</li>
          <li>{t('features.reactCompiler.description.textGuidelineTest2')}</li>
          <li>{t('features.reactCompiler.description.textGuidelineTest3')}</li>
          <li>{t('features.reactCompiler.description.textGuidelineTest4')}</li>
          <li>{t('features.reactCompiler.description.textGuidelineTest5')}</li>
        </ol>
      </div>
    </div>
  );
};

export default ReactCompilerExample;
