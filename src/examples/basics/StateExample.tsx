import { useState } from 'react';
import Button from "../../components/common/Button.tsx";
import { useTranslation } from 'react-i18next';

/**
 * useState 기본 사용법 예제
 * A React functional component demonstrating the usage of the `useState` hook.
 * The component includes three sections:
 * - A counter with increment, decrement, and reset functionality.
 * - Input text management for updating a name state.
 * - A toggle button for showing or hiding a text element.
 *
 * @return {JSX.Element} A styled container displaying interactive examples of `useState` usage.
 */
export default function StateExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>{t('features.useState.title')}</h2>
      
      {/* 숫자 상태 */}
      <h3>{`1. ${t('features.useState.heading.titleCounter')}`}</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>{t('common.count')}: {count}</p>
        <Button variant='function' size='medium' style={{ border: '1px solid #dee2e6', }} onClick={() => setCount(count + 1)}>{t('common.increase')}</Button>
        <Button variant='function' size='medium' style={{ marginLeft: '5px', border: '1px solid #dee2e6', }} onClick={() => setCount(count - 1)}>{t('common.decrease')}</Button>
        <Button variant='function' size='medium' style={{ marginLeft: '5px', border: '1px solid #dee2e6', }} onClick={() => setCount(0)}>{t('common.reset')}</Button>
      </div>

      {/* 문자열 상태 */}
      <h3>{`2. ${t('features.useState.heading.titleTextInput')}`}</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>{t('common.name')}: {name || t('common.enterName')}</p>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('common.enterName')}
          style={{ padding: '10px', marginRight: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      {/* Boolean 상태 */}
      <h3>{`3. ${t('features.useState.heading.titleToggleButton')}`}</h3>
      <div>
        <Button variant='function' size='medium' style={{ border: '1px solid #dee2e6', }} onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? t('common.hide') : t('common.show')}
        </Button>
        {isVisible && (
          <p style={{ color: '#3230B6', fontWeight: 'bold', fontSize: '16px', marginTop: '10px', backgroundColor: '#E8F4FF', padding: '10px', borderRadius: '4px' }}>
            {t('features.useState.label.textToggle')}
          </p>
        )}
      </div>
    </div>
  );
}
