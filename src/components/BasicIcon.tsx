'use client';

import { MouseEvent } from 'react';

import { IconType } from '@/types';

interface Props {
  className?: string;
  disabled?: boolean;
  iconType?: IconType;
  onClick?: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

export default function BasicIcon(props: Props) {
  const { className = '', iconType = 'arrow-sm', onClick, disabled = false } = props;

  const handleClick = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    if (!disabled && onClick) onClick(event);
  };

  return (
    <i
      data-disabled={disabled}
      onClick={handleClick}
      className={`icon-${iconType} ${className} data-[disabled="true"]:cursor-not-allowed`}
      data-test-comp={BasicIcon.name}
    />
  );
}
