import { ReactElement } from 'react';

import BasicIcon from './BasicIcon';

export interface Props {
  children?: ReactElement;
  className?: string;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPrev: () => void;
  page: number;
  totalPage: number;
}

export default function Pagination(props: Props) {
  const { children, className = '', page, totalPage, onNext, onPrev, onFirst, onLast } = props;

  const hasPrev: boolean = page > 1;
  const hasNext: boolean = page < totalPage;

  return (
    <div className={`mt-6 sm:flex sm:items-center sm:justify-between ${className}`} data-test-comp={Pagination.name}>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <span>Page&nbsp;</span>
        <span className="font-medium text-gray-700 dark:text-gray-100">
          <span>{page}</span>
          <span>&nbsp;of&nbsp;</span>
          <span>{totalPage}</span>
        </span>
      </div>

      <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
        <button
          disabled={!hasPrev}
          onClick={onFirst}
          type="button"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <BasicIcon iconType="angles-left-solid" />
        </button>

        <button
          disabled={!hasPrev}
          onClick={onPrev}
          type="button"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <BasicIcon iconType="angle-left-solid" />
        </button>

        <button
          disabled={!hasNext}
          type="button"
          onClick={onNext}
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <BasicIcon iconType="angle-right-solid" />
        </button>

        <button
          disabled={!hasNext}
          onClick={onLast}
          type="button"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <BasicIcon iconType="angles-right-solid" />
        </button>
      </div>
    </div>
  );
}
