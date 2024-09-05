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
    <aside className="w-56 h-full bg-gray-100 dark:bg-gray-800 px-3 py-4 border-r border-gray-200 overflow-y-auto relative">
      {/* <BasicIcon
        iconType="angle-right-solid"
        className="w-full bg-gray-200 block"
        onClick={() => setIsActive((prev) => !prev)}
      /> */}
      <ul className="space-y-2">
        {list.map((item, index) => (
          <MenuItemComp key={index} item={item} isActive={isActive} />
        ))}
      </ul>
    </aside>
  );
}
