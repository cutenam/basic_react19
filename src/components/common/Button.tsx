import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '../../styles/components/Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'function' | 'base' ;
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
}

/**
 * CSS Modules를 사용하여 가상 선택자를 구현한 Button 컴포넌트
 * 스타일이 모듈화되어 있어 클래스명 충돌을 방지
 */
export default function Button({
  variant = 'base',
  size = 'medium',
  children,
  className = '',
  ...props
}: ButtonProps) {
  // CSS Modules 클래스명 조합
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}
