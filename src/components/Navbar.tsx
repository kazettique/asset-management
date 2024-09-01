import Link from 'next/link';
import { ReactElement } from 'react';

import Icon from './Icon';

export interface Props {
  children?: ReactElement;
  className?: string;
}

export default function Navbar(props: Props) {
  const { className = '', children } = props;

  return (
    <header
      className={`flex justify-between items-center h-14 px-4 w-full border-b border-gray-300 bg-gray-200 dark:bg-gray-800 ${className}`}
    >
      <div className="flex items-center gap-x-2">
        <Icon iconType="cube-solid" className="text-2xl text-slate-700" />
        <Link href="/" className="text-xl font-bold flex items-center lg:ml-2.5 text-slate-700 dark:text-slate-200">
          <span className="self-center whitespace-nowrap">Asset Management</span>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="text-slate-700 text-sm">Hello! User</div>
        <Icon iconType="person-circle" className="text-2xl text-slate-700" />
      </div>
    </header>
  );
}
