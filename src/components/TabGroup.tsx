import { ReactElement } from 'react';

export interface Props {
  children?: ReactElement;
  className?: string;
}

export default function TabGroup(props: Props) {
  const { children, className = '' } = props;

  return (
    <div
      {...props}
      className={`inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700 ${className}`}
      data-test-comp={TabGroup.name}
    >
      <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
        All
      </button>

      <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
        Lived
      </button>

      <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
        Dead
      </button>
    </div>
  );
}
