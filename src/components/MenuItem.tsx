'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useState } from 'react';

import { MenuItem } from '@/types';

import Icon from './Icon';

export interface Props {
  children?: ReactElement;
  className?: string;
  item: MenuItem;
}

export default function Component(props: Props) {
  const { children, className = '', item } = props;

  const pathname = usePathname();
  const isActiveLink: boolean = item.link !== null && item.link === pathname;

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const hasChildren: boolean = item.children.length > 0;
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <li
      {...props}
      className={`text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 ${className}`}
      data-test-comp={Component.name}
    >
      {item.link ? (
        <Link
          href={item.link}
          className={`w-full flex items-center p-2 rounded-lg dark:text-white gap-x-3 ${isActiveLink ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          <Icon
            iconType={item.icon}
            className="flex-shrink-0 w-6 h-6 text-center text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          />
          <div className="capitalize grow text-left">{item.label}</div>
        </Link>
      ) : (
        <button
          onClick={toggleOpen}
          type="button"
          className="w-full flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-x-3"
        >
          <Icon
            iconType={item.icon}
            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          />
          <div className="capitalize grow text-left">{item.label}</div>
          {hasChildren && <Icon iconType={isOpen ? 'chevron-up' : 'chevron-down'} />}
        </button>
      )}

      {isOpen && (
        <ul className="space-y-2 block my-2 ml-4">
          {item.children.map((item, index) => (
            <Component key={index} item={item} />
          ))}
        </ul>
      )}
    </li>
  );
}
