import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export default function BasicButton(props: Props) {
  const { children, variant = 'primary', className, type = 'button', ...rest } = props;

  return (
    <button
      data-test-comp={BasicButton.name}
      className={`basicButton ${className}`}
      type={type}
      data-variant={variant}
      {...rest}
    >
      {children}
    </button>
  );
}
