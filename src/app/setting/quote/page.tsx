'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { QuoteFetcher } from '@/fetcher';
import { quoteMachine } from '@/machines';
import { QuoteTransformer } from '@/transformer';
import { FQuote, Id, VQuote, VQuoteTable } from '@/types';

import QuoteModifier from './QuoteModifier';

export default function Page() {
  const [state, send] = useMachine(quoteMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => QuoteFetcher.FindAll(),
    queryKey: ['quoteList'],
  });

  const createQuote = useMutation({
    mutationFn: (payload: FQuote) => QuoteFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateQuote = useMutation({
    mutationFn: ({ payload, id }: { id: VQuote['id']; payload: FQuote }) => QuoteFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteQuote = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return QuoteFetcher.Delete(id);
      } else {
        throw Error('Deletion terminated.');
      }
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onItemUpdate = (quote: FQuote, id: VQuote['id']): void => {
    updateQuote.mutate({ id, payload: quote });
  };

  const onItemDelete = (id: VQuote['id']): void => {
    deleteQuote.mutate(id);
  };

  const onCreateSubmit = (data: FQuote) => {
    createQuote.mutate(data);
  };

  const tableData: VQuoteTable[] = data ? data.data.map((item) => QuoteTransformer.VTQuoteTransformer(item)) : [];
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
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Quotes</h2>
        <BasicButton onClick={() => send({ type: 'TO_CREATE' })}>Create</BasicButton>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        {!data ? (
          <LoadingSpinner className="h-full" />
        ) : (
          <Table
            className="overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg relative"
            data={tableData}
            columns={columns}
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
        defaultValues={state.context.formValues}
        id={state.context.id}
      />
    </div>
  );
}
