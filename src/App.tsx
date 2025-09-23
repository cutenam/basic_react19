import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// 새로운 구조의 컴포넌트들 import
import Navigation from './components/layout/Navigation'
import StateExample from './examples/basics/StateExample'
import EffectExample from './examples/basics/EffectExample'
import ActionsExample, { OptimisticExample, FormStatusExample } from './examples/react19/ActionsExample'
import CustomHookExample from './examples/hooks/CustomHookExample'

import type { ExampleType } from './types'

function App() {
  const [currentExample, setCurrentExample] = useState<ExampleType>('state')

  const renderExample = () => {
    switch (currentExample) {
      case 'state':
        return <StateExample />
      case 'effect':
        return <EffectExample />
      case 'actions':
        return <ActionsExample />
      case 'optimistic':
        return <OptimisticExample />
      case 'form-status':
        return <FormStatusExample />
      case 'custom-hooks':
        return <CustomHookExample />
      default:
        return <StateExample />
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>React 19 학습 프로젝트</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          체계적으로 구성된 React 학습 예제들을 통해 단계별로 학습해보세요
        </p>
      </header>

      <Navigation 
        currentExample={currentExample} 
        onExampleChange={(example) => setCurrentExample(example as ExampleType)} 
      />
      
      <main>
        {renderExample()}
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        padding: '20px', 
        borderTop: '1px solid #eee',
        color: '#666'
      }}>
        <p>React 19 + TypeScript + Vite로 구성된 학습용 프로젝트</p>
      </footer>
    </div>
  )
}

export default App
