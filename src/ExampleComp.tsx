import { ReactElement } from 'react';

export interface Props {
  children?: ReactElement;
  className?: string;
}

export default function Component(props: Props) {
  const { children, className = '' } = props;

  return (
    <div {...props} className={`${className}`} data-test-comp={Component.name}>
      {children}
    </div>
  );
}
