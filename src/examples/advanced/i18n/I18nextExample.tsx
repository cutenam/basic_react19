import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * I18next 라이브러리를 이용한 다국어 지원 예제
 * - 한국어, 영어, 일본어
 *
 * A React functional component that provides an example of using the i18next library for internationalization and localization.
 * This component includes features such as language selection, interpolation, pluralization, and styled UI components for displaying translations in multiple languages.
 *
 */
export default function I18nextExample() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [messageCount, setMessageCount] = useState(0);

  // 언어 변경 함수
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 헤더 */}
      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
          🌐 {t('i18next.title')}
        </h2>
      </div>

      {/* 언어 선택 */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          {t('i18next.selectLanguage')}
        </h3>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <button
            onClick={() => changeLanguage('ko')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: i18n.language === 'ko' ? '2px solid #f5576c' : '2px solid #ddd',
              background: i18n.language === 'ko' ? '#f5576c' : 'white',
              color: i18n.language === 'ko' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: i18n.language === 'ko' ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
            }}
          >
            🇰🇷 한국어
          </button>
          
          <button
            onClick={() => changeLanguage('en')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: i18n.language === 'en' ? '2px solid #f5576c' : '2px solid #ddd',
              background: i18n.language === 'en' ? '#f5576c' : 'white',
              color: i18n.language === 'en' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: i18n.language === 'en' ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
            }}
          >
            🇺🇸 English
          </button>

          <button
            onClick={() => changeLanguage('ja')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: i18n.language === 'ja' ? '2px solid #f5576c' : '2px solid #ddd',
              background: i18n.language === 'ja' ? '#f5576c' : 'white',
              color: i18n.language === 'ja' ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: i18n.language === 'ja' ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
            }}
          >
            🇯🇵 日本語
          </button>
        </div>

        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          {t('i18next.currentLanguage')}: <strong>
            {i18n.language === 'ko' ? '한국어' : i18n.language === 'en' ? 'English' : '日本語'}
          </strong>
        </p>
      </div>

      {/* 설명 */}
      <div style={{
        background: '#f8f9fa',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #e0e0e0'
      }}>
        <p style={{ margin: 0, fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
          {t('i18next.description')}
        </p>
      </div>

      {/* 주요 기능 */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          ✨ {t('i18next.features.title')}
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left' }}>{t('i18next.features.feature1')}</li>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left' }}>{t('i18next.features.feature2')}</li>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left' }}>{t('i18next.features.feature3')}</li>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left' }}>{t('i18next.features.feature4')}</li>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left' }}>{t('i18next.features.feature5')}</li>
          <li style={{ color: '#555', marginBottom: '8px', textAlign: 'left' }}>{t('i18next.features.feature6')}</li>
        </ul>
      </div>

      {/* 보간(Interpolation) */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          🔤 {t('i18next.interpolation.title')}
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder={t('i18next.interpolation.enterName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '2px solid #ddd',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '10px'
        }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold', color: '#f5576c' }}>
            {t('i18next.interpolation.greeting', { name: name || 'Guest' })}
          </p>
          <p style={{ margin: 0, fontSize: '16px', color: '#555' }}>
            {t('i18next.interpolation.welcome', { appName: 'React 19 Lecture Project' })}
          </p>
          <p style={{ margin: 0, fontSize: '16px', color: '#555' }}>
            {t('i18next.interpolation.userInfo', { count: messageCount })}
          </p>
        </div>
      </div>

      {/* 복수형 처리 */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          🔢 {t('i18next.pluralization.title')}
        </h3>
        <div>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
            {t('i18next.pluralization.labelMessage')}: {messageCount}
          </label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={() => setMessageCount(Math.max(0, messageCount - 1))}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '6px',
                border: '2px solid #dc3545',
                background: '#dc3545',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              -
            </button>
            <button
              onClick={() => setMessageCount(messageCount + 1)}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '6px',
                border: '2px solid #28a745',
                background: '#28a745',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              +
            </button>
            <p style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              margin: 0,
              fontSize: '16px',
              color: '#333',
              flex: 1
            }}>
              {t('i18next.pluralization.message', { count: messageCount })}
            </p>
          </div>
        </div>
      </div>

      {/* 중첩 객체 */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
          📁 {t('i18next.nested.title')}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{
            background: '#e3f2fd',
            padding: '15px',
            borderRadius: '8px',
            border: '2px solid #2196f3'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>User Menu</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
              <li style={{textAlign: 'left'}}>{t('i18next.nested.user.profile')}</li>
              <li style={{textAlign: 'left'}}>{t('i18next.nested.user.settings')}</li>
              <li style={{textAlign: 'left'}}>{t('i18next.nested.user.logout')}</li>
            </ul>
          </div>

          <div style={{
            background: '#fff3e0',
            padding: '15px',
            borderRadius: '8px',
            border: '2px solid #ff9800'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>Admin Menu</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
              <li style={{textAlign: 'left'}}>{t('i18next.nested.admin.dashboard')}</li>
              <li style={{textAlign: 'left'}}>{t('i18next.nested.admin.users')}</li>
              <li style={{textAlign: 'left'}}>{t('i18next.nested.admin.settings')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
