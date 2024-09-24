'use client';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import Pagination from '@/components/Pagination';
import Table, { ColumnProps } from '@/components/Table';
import { CategoryTransformer } from '@/transformer';
import { VCategoryTable } from '@/types';

import CategoryModifier from './CategoryModifier';
import useCategoryData from './useCategoryData';

export default function Page() {
  const { data, isPending, onCreateSubmit, onItemDelete, onItemUpdate, refetch, send, state, tableData } =
    useCategoryData();

  const columns: ColumnProps<VCategoryTable>[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'comment',
      title: 'Comment',
    },
    {
      key: 'action',
      render: (column, item) => (
        <BasicIcon
          className="bg-slate-500 shadow-slate-500/20 hover:shadow-slate-500/40 p-2 rounded-md text-white cursor-pointer"
          iconType="pen-to-square-solid"
          onClick={() =>
            void send({
              formValues: CategoryTransformer.VFCategoryTransformer(item.raw),
              id: item.raw.id,
              type: 'TO_EDIT',
            })
          }
        />
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-4 relative overflow-y-auto h-full flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Categories</h2>
        <BasicButton onClick={() => send({ type: 'TO_CREATE' })}>Create</BasicButton>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        <Table
          className="grow overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg relative"
          data={tableData}
          columns={columns}
          isLoading={isPending}
        />
        {data && state.context.searchPayload.page && (
          <Pagination
            page={state.context.searchPayload.page}
            totalPage={data.totalPage}
            onNext={() => void send({ type: 'NEXT_PAGE' })}
            onPrev={() => void send({ type: 'PREV_PAGE' })}
            onFirst={() => void send({ payload: 1, type: 'JUMP_PAGE' })}
            onLast={() => void send({ payload: data.totalPage, type: 'JUMP_PAGE' })}
          />
        )}
      </div>

      <CategoryModifier
        isOpen={state.matches('EDIT') || state.matches('CREATE')}
        onClose={() => send({ type: 'TO_MAIN' })}
        mode={state.matches('EDIT') ? 'edit' : state.matches('CREATE') ? 'create' : undefined}
        onUpdate={(data, id) => {
          onItemUpdate(data, id);
          send({ type: 'TO_MAIN' });
        }}
        onCreate={(data) => {
          onCreateSubmit(data);
          send({ type: 'TO_MAIN' });
        }}
        onDelete={(id) => {
          onItemDelete(id);
          send({ type: 'TO_MAIN' });
        }}
        defaultValues={state.context.modifier.formValues}
        id={state.context.modifier.id}
      />
    </div>
  );
}
