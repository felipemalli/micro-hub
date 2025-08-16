declare module 'sharedComponents/Button' {
  import { ComponentType } from 'react';
  
  export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
  }
  
  const Button: ComponentType<ButtonProps>;
  export default Button;
}

declare module 'sharedComponents/Card' {
  import { ComponentType } from 'react';
  
  export interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    className?: string;
    onClick?: () => void;
  }
  
  const Card: ComponentType<CardProps>;
  export default Card;
}