import { MenuItem } from '@/types';

import MenuItemComp from './MenuItem';

export interface Props {
  list: MenuItem[];
}

// ref: https://www.creative-tim.com/twcomponents/component/tailwind-css-sidebar-dropdown
export default function SideMenu(props: Props) {
  const { list } = props;

  return (
    <>
      <aside className="w-64 h-full bg-gray-50 dark:bg-gray-800 px-3 py-4">
        <ul className="space-y-2">
          {list.map((item, index) => (
            <MenuItemComp key={index} item={item} />
          ))}
        </ul>
      </aside>
    </>
  );
}
