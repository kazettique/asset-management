'use client';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import Pagination from '@/components/Pagination';
import Table, { ColumnProps } from '@/components/Table';
import { QuoteTransformer } from '@/transformer';
import { VQuoteTable } from '@/types';

import QuoteImport from './QuoteImport';
import QuoteModifier from './QuoteModifier';
import useQuoteData from './useQuoteData';

export default function Page() {
  const { data, isPending, onCreateSubmit, onItemDelete, onItemUpdate, refetch, send, state, tableData } =
    useQuoteData();

  const columns: ColumnProps<VQuoteTable>[] = [
    {
      key: 'quote',
      title: 'quote',
    },
    {
      key: 'author',
      title: 'author',
    },
    {
      key: 'action',
      render: (column, item) => (
        <BasicIcon
          className="bg-slate-500 shadow-slate-500/20 hover:shadow-slate-500/40 p-2 rounded-md text-white cursor-pointer"
          iconType="pen-to-square-solid"
          onClick={() =>
            void send({
              formValues: QuoteTransformer.VFQuoteTransformer(item.raw),
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
      <div className="flex justify-between gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white grow">Quotes</h2>
        <BasicButton variant="secondary" onClick={() => send({ type: 'TO_IMPORT' })} className="flex gap-x-2">
          <BasicIcon iconType="file-import-solid" />
          <span>Import</span>
        </BasicButton>

        <BasicButton onClick={() => send({ type: 'TO_CREATE' })} className="flex gap-x-2">
          <BasicIcon iconType="cross" />
          <span>Create</span>
        </BasicButton>
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

      <QuoteModifier
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

      <QuoteImport
        isOpen={state.matches('IMPORT')}
        onClose={() => void send({ type: 'TO_MAIN' })}
        onDone={() => {
          void send({ type: 'TO_MAIN' });
          refetch();
        }}
        onImport={(payload) => void send({ payload, type: 'IMPORT_TASK_TO_QUEUE' })}
        state={
          state.matches({ IMPORT: 'PREPARE' })
            ? 'PREPARE'
            : state.matches({ IMPORT: 'PROCESSING' })
              ? 'PROCESSING'
              : 'FINISH'
        }
        importContext={state.context.import}
      />
    </div>
  );
}
