import React from 'react';
import { CoreButton } from "@felipemalli-libs/microhub-ui/react";

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const sizeToCoreSize = (size: ButtonSize): 'small' | 'medium' | 'large' => {
  switch (size) {
    case 'sm':
      return 'small';
    case 'lg':
      return 'large';
    default:
      return 'medium';
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'outline',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <CoreButton
      variant={variant}
      size={sizeToCoreSize(size)}
      disabled={disabled || isLoading}
      type={(props.type as any) || 'button'}
      onCoreClick={(props.onClick as any)}
    >
      {isLoading ? 'Carregando...' : children}
    </CoreButton>
  );
};