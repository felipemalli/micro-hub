export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface ComponentState {
  loading?: boolean;
  disabled?: boolean;
}

export interface ClickableProps {
  onClick?: (event: React.MouseEvent) => void;
}

export interface FormComponentProps {
  name?: string;
  id?: string;
  required?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}