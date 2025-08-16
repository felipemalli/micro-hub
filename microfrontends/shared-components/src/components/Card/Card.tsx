import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  onClick,
}) => {
  const baseClasses = 'card-base';
  const variantClasses = {
    default: 'card-default',
    elevated: 'card-elevated',
    outlined: 'card-outlined',
    glass: 'card-glass'
  };
  const paddingClasses = {
    none: '',
    sm: 'card-padding-sm',
    md: 'card-padding-md',
    lg: 'card-padding-lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    hover && 'card-hover',
    onClick && 'card-clickable',
    className
  ].filter(Boolean).join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component className={classes} onClick={onClick}>
      {children}
    </Component>
  );
};

export default Card;