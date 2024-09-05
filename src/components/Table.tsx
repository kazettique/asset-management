import { ReactElement } from 'react';

export interface ColumnProps<T> {
  key: string;
  render?: (column: ColumnProps<T>, item: T) => ReactElement;
  title: string | ReactElement;
}

type Props<T> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
};

// ref: https://medium.com/@thashwiniwattuhewa/generic-react-table-component-1407a6fc2179
// ref: https://www.bekk.christmas/post/2020/22/create-a-generic-table-with-react-and-typescript
// ref: https://www.creative-tim.com/twcomponents/component/table-with-filter-and-search
export default function Table<T>({ data, columns }: Props<T>) {
  const headers = columns.map((column, index) => {
    return (
      <th
        key={`headCell-${index}`}
        scope="col"
        className="capitalize py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        {column.title}
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td
        colSpan={columns.length}
        className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center text-gray-500 dark:text-gray-400"
      >
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr key={`row-${index}`}>
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return (
              <td
                key={`cell-${index2}`}
                className="px-4 py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200"
              >
                {value}
              </td>
            );
          })}
        </tr>
      );
    })
  );

  return (
    <div className="overflow-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 shadow">
          <tr>{headers}</tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">{rows}</tbody>
      </table>
    </div>
  );
}
