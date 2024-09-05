'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useState } from 'react';

import { MenuItem } from '@/types';

import BasicIcon from './BasicIcon';

export interface Props {
  children?: ReactElement;
  className?: string;
  isActive: boolean;
  item: MenuItem;
}

export default function MenuItemComp(props: Props) {
  const { children, className = '', item, isActive } = props;

  const pathname = usePathname();
  const isActiveLink: boolean = item.link !== null && item.link === pathname;

  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  const hasChildren: boolean = item.children.length > 0;
  const toggleOpen = () => setIsCollapse((prev) => !prev);

  return (
    <li
      {...props}
      className={`text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 ${className}`}
      data-test-comp={MenuItemComp.name}
    >
      {item.link ? (
        <Link
          href={item.link}
          className={`w-full flex items-center p-2 rounded-lg dark:text-white gap-x-3 ${isActiveLink ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          <BasicIcon
            iconType={item.icon}
            className="flex-shrink-0 w-6 h-6 text-center text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          />
          {isActive && <div className="capitalize grow text-left">{item.label}</div>}
        </Link>
      ) : (
        <button
          onClick={toggleOpen}
          type="button"
          className="w-full flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-x-3"
        >
          <BasicIcon
            iconType={item.icon}
            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          />
          {isActive && <div className="capitalize grow text-left">{item.label}</div>}
          {hasChildren && isActive && <BasicIcon iconType={isCollapse ? 'angle-up-solid' : 'angle-down-solid'} />}
        </button>
      )}

      {isCollapse && (
        <ul className="space-y-2 block my-2">
          {item.children.map((item, index) => (
            <MenuItemComp key={index} item={item} isActive={isActive} />
          ))}
        </ul>
      )}
    </li>
  );
}
