import Link from 'next/link';
import { ReactElement } from 'react';

import BasicIcon from './BasicIcon';

export interface Props {
  children?: ReactElement;
  className?: string;
}

export default function Navbar(props: Props) {
  const { className = '', children } = props;

  return (
    <header
      className={`flex justify-between items-center h-14 px-4 w-full border-b border-gray-300 bg-gray-200 dark:bg-gray-800 text-slate-700 dark:text-slate-200 ${className}`}
    >
      <div className="flex items-center gap-x-2">
        <BasicIcon iconType="cube-solid" className="text-2xl" />
        <Link href="/" className="text-xl font-bold flex items-center lg:ml-2.5 ">
          <span className="self-center whitespace-nowrap">Asset Management</span>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="text-sm">Hello! User</div>
        <BasicIcon iconType="person-circle" className="text-2xl" />
      </div>
    </header>
  );
}
