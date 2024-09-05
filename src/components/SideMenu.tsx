'use client';

import { useState } from 'react';

import { MenuItem } from '@/types';

import BasicIcon from './BasicIcon';
import MenuItemComp from './MenuItem';

export interface Props {
  list: MenuItem[];
}

// ref: https://www.creative-tim.com/twcomponents/component/tailwind-css-sidebar-dropdown
export default function SideMenu(props: Props) {
  const { list } = props;
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <aside className="h-full bg-gray-100 dark:bg-gray-800 border-r border-gray-200 flex">
      <div className="overflow-y-auto h-full px-3 py-4">
        <ul className="space-y-2">
          {list.map((item, index) => (
            <MenuItemComp key={index} item={item} isActive={isActive} />
          ))}
        </ul>
      </div>
      <BasicIcon
        iconType={isActive ? 'angle-left-solid' : 'angle-right-solid'}
        className="h-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-200"
        onClick={() => setIsActive((prev) => !prev)}
      />
    </aside>
  );
}
