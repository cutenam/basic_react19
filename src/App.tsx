import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ActionsExample from './components/ActionsExample'

function App() {
  const [currentExample, setCurrentExample] = useState<'actions' | 'counter'>('actions')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React 19 학습 예제</h1>
      
      <div className="card">
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setCurrentExample('actions')}
            style={{ 
              marginRight: '10px',
              backgroundColor: currentExample === 'actions' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Actions 예제
          </button>
          <button 
            onClick={() => setCurrentExample('counter')}
            style={{ 
              backgroundColor: currentExample === 'counter' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            기본 카운터
          </button>
        </div>
        
        {currentExample === 'actions' ? (
          <ActionsExample />
        ) : (
          <CounterExample />
        )}
      </div>
    </>
  )
}

function CounterExample() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
