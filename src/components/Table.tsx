import { Transition } from '@headlessui/react';
import { ReactElement } from 'react';

import LoadingSpinner from './LoadingSpinner';

export interface ColumnProps<T> {
  className?: string;
  key: string;
  render?: (column: ColumnProps<T>, item: T) => ReactElement;
  title: string | ReactElement;
}

type Props<T> = {
  className?: string;
  columns: Array<ColumnProps<T>>;
  data?: T[];
  hasNumber?: boolean;
  isLoading?: boolean;
};

// ref: https://medium.com/@thashwiniwattuhewa/generic-react-table-component-1407a6fc2179
// ref: https://www.bekk.christmas/post/2020/22/create-a-generic-table-with-react-and-typescript
// ref: https://www.creative-tim.com/twcomponents/component/table-with-filter-and-search
export default function Table<T>(props: Props<T>) {
  const { data, columns, className, isLoading = false, hasNumber = true } = props;

  const headers = columns.map((column, index) => {
    return (
      <th
        key={`headCell-${index}`}
        scope="col"
        className={`capitalize py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400 ${column.className}`}
      >
        {column.title}
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td
        colSpan={hasNumber ? columns.length + 1 : columns.length}
        className="p-2 text-sm font-medium whitespace-nowrap text-center text-gray-500 dark:text-gray-400"
      >
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr
          key={`row-${index}`}
          className="text-gray-700 dark:text-gray-200 even:bg-gray-100 dark:even:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {hasNumber && <td className="text-sm text-left p-3.5">{index + 1}</td>}
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return (
              <td key={`cell-${index2}`} className={`p-3.5 text-sm ${column.className}`}>
                {value}
              </td>
            );
          })}
        </tr>
      );
    })
  );

  return (
    <div className={`${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 shadow">
          <tr>
            {hasNumber && (
              <th
                scope="col"
                className="capitalize p-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
              >
                #
              </th>
            )}
            {headers}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">{rows}</tbody>
      </table>

      <Transition show={isLoading}>
        <div className="absolute w-full h-full top-0 left-0 bg-gray-500 bg-opacity-75 flex items-center justify-center transition duration-75 data-[closed]:opacity-0">
          <LoadingSpinner />
        </div>
      </Transition>
    </div>
  );
}
