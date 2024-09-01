import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export default function Button(props: Props) {
  const { children, variant = 'primary', className, type = 'button' } = props;

  return (
    <button {...props} className={`basicButton ${className}`} type={type} data-variant={variant}>
      {children}
    </button>
  );
}
