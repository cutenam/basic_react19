import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useTranslation } from 'react-i18next';

// 새로운 구조의 컴포넌트들 import
import Navigation from './components/layout/Navigation'
import LanguageSwitcher from './components/common/LanguageSwitcher'
import StateExample from './examples/basics/StateExample'
import EffectExample from './examples/basics/EffectExample'
import ContextExample from './examples/basics/ContextExample'
import AuthContextExample from './examples/basics/AuthContextExample'
import I18nExample from './examples/advanced/i18n/I18nExample.tsx'
import I18nextExample from './examples/advanced/i18n/I18nextExample.tsx'
import ReduxExample from './examples/advanced/redux/ReduxExample'
import ActionsExample from './examples/react19/ActionsExample'
import OptimisticExample from './examples/react19/OptimisticExample'
import FormStatusExample from './examples/react19/FormStatusExample'
import CustomHookExample from './examples/hooks/CustomHookExample'
import UseHookExample from './examples/react19/UseHookExample'
import ReactCompilerExample from './examples/react19/ReactCompilerExample'
import { LanguageProvider } from './examples/advanced/i18n/LanguageContext.tsx'

import type { ExampleType } from './types'

function App() {
  const [currentExample, setCurrentExample] = useState<ExampleType>('state')
  const { t } = useTranslation();

  const renderExample = () => {
    switch (currentExample) {
      case 'state':
        return <StateExample />
      case 'effect':
        return <EffectExample />
      case 'context':
        return <ContextExample />
      case 'auth-context':
        return <AuthContextExample />
      case 'i18n':
        return <I18nExample />
      case 'i18next':
        return <I18nextExample />
      case 'redux':
        return <ReduxExample />
      case 'actions':
        return <ActionsExample />
      case 'optimistic':
        return <OptimisticExample />
      case 'form-status':
        return <FormStatusExample />
      case 'use-hook':
        return <UseHookExample />
      case 'react-compiler':
        return <ReactCompilerExample />
      case 'custom-hooks':
        return <CustomHookExample />
      default:
        return <StateExample />
    }
  }

  return (
    <LanguageProvider>
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
        <h1 style={{ color: '#333', marginBottom: '10px' }}>{t('common.appname')}</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          {t('appInfo.description')}
        </p>
        
        {/* 전역 언어 선택기 */}
        <LanguageSwitcher />
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
        <p>{t('appInfo.footerTitle')}</p>
      </footer>
    </div>
    </LanguageProvider>
  )
}

export default App
