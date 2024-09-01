import { ReactElement } from 'react';

export interface Props {
  children?: ReactElement;
  className?: string;
}

export default function Navbar(props: Props) {
  const { className = '', children } = props;

  return <div className={className}>{children}</div>;
}
