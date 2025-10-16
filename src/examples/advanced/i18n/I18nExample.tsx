import { useState } from 'react';
import useLanguage from './useLanguage';

/**
 * 컨텍스트를 이용한 다국어 지원 예제
 *  - 한국어, 영어, 일본어
 *  - 카운터 기능
 *
 * A React component demonstrating internationalization support with basic features
 * such as language selection, greetings, usage instructions, key features,
 * and a counter example. The component utilizes a translation function (`t`)
 * for multi-language support and allows users to interactively switch between languages.
 *
 */
export default function I18nExample() {
  const { language, setLanguage, t } = useLanguage();
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
          🌍 {t('i18n.title')}
        </h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
          {t('i18n.subtitle')}
        </p>
      </div>

      {/* 언어 선택 섹션 */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          {t('i18n.selectLanguage')}
        </h3>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={() => setLanguage('ko')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: language === 'ko' ? '2px solid #667eea' : '2px solid #ddd',
              background: language === 'ko' ? '#667eea' : 'white',
              color: language === 'ko' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: language === 'ko' ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
            }}
          >
            🇰🇷 {t('i18n.korean')}
          </button>
          
          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: language === 'en' ? '2px solid #667eea' : '2px solid #ddd',
              background: language === 'en' ? '#667eea' : 'white',
              color: language === 'en' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: language === 'en' ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
            }}
          >
            🇺🇸 {t('i18n.english')}
          </button>

          <button
            onClick={() => setLanguage('ja')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: language === 'ja' ? '2px solid #667eea' : '2px solid #ddd',
              background: language === 'ja' ? '#667eea' : 'white',
              color: language === 'ja' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: language === 'ja' ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
            }}
          >
            🇯🇵 {t('i18n.japanese')}
          </button>
        </div>

        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          * {t('i18n.currentLanguage')}: <strong>{language === 'ko' ? '한국어' : language === 'en' ? 'English' : '日本語'}</strong>
        </p>
      </div>

      {/* 인사말 섹션 */}
      <div style={{
        background: '#f8f9fa',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          👋 {t('common.welcome')}
        </h3>
        <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#555' }}>
          {t('i18n.greeting')}
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          {t('i18n.description')}
        </p>
      </div>

      {/* 주요 기능 섹션 */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          ✨ {t('i18n.features.title')}
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8'}}>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left' }}>{t('i18n.features.feature1')}</li>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left'  }}>{t('i18n.features.feature2')}</li>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left'  }}>{t('i18n.features.feature3')}</li>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left'  }}>{t('i18n.features.feature4')}</li>
        </ul>
      </div>

      {/* 사용 방법 섹션 */}
      <div style={{
        background: '#fff3cd',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #ffc107'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#856404' }}>
          📖 {t('i18n.usage.title')}
        </h3>
        <ol style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li style={{ color: '#856404', marginBottom: '8px', textAlign: 'left'  }}>{t('i18n.usage.step1')}</li>
          <li style={{ color: '#856404', marginBottom: '8px', textAlign: 'left'  }}>{t('i18n.usage.step2')}</li>
          <li style={{ color: '#856404', marginBottom: '8px', textAlign: 'left'  }}>{t('i18n.usage.step3')}</li>
        </ol>
      </div>

      {/* 카운터 예제 */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          🔢 {t('i18n.counter.title')}
        </h3>
        
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
            {t('i18n.counter.count')}
          </p>
          <p style={{ margin: 0, fontSize: '48px', fontWeight: 'bold', color: '#667eea' }}>
            {count}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => setCount(count - 1)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '2px solid #dc3545',
              background: '#dc3545',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
          >
            ➖ {t('i18n.counter.decrement')}
          </button>

          <button
            onClick={() => setCount(0)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '2px solid #6c757d',
              background: '#6c757d',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
          >
            🔄 {t('i18n.counter.reset')}
          </button>

          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '2px solid #28a745',
              background: '#28a745',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
          >
            ➕ {t('i18n.counter.increment')}
          </button>
        </div>
      </div>
    </div>
  );
}
