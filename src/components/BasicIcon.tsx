import { MouseEvent } from 'react';

import { IconType } from '@/types';

interface Props {
  className?: string;
  iconType?: IconType;
  onClick?: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

export default function BasicIcon(props: Props) {
  const { className = '', iconType = 'arrow-sm', onClick } = props;

  return <i onClick={onClick} className={`icon-${iconType} ${className}`} data-test-comp={BasicIcon.name} />;
}
