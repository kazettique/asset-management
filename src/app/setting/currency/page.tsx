'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { CurrencyFetcher } from '@/fetcher';
import { currencyMachine } from '@/machines';
import { CurrencyTransformer } from '@/transformer';
import { FCurrency, Id, VCurrency, VCurrencyTable } from '@/types';

import CurrencyModifier from './CurrencyModifier';

export default function Page() {
  const [state, send] = useMachine(currencyMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => CurrencyFetcher.FindAll(),
    queryKey: ['currencyList'],
  });

  const createCurrency = useMutation({
    mutationFn: (payload: FCurrency) => CurrencyFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateCurrency = useMutation({
    mutationFn: ({ payload, id }: { id: VCurrency['id']; payload: FCurrency }) => CurrencyFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteCurrency = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return CurrencyFetcher.Delete(id);
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

  const onItemUpdate = (currency: FCurrency, id: VCurrency['id']): void => {
    updateCurrency.mutate({ id, payload: currency });
  };

  const onItemDelete = (id: VCurrency['id']): void => {
    deleteCurrency.mutate(id);
  };

  const onCreateSubmit = (data: FCurrency) => {
    createCurrency.mutate(data);
  };

  const tableData: VCurrencyTable[] = data
    ? data.data.map((item) => CurrencyTransformer.VTCurrencyTransformer(item))
    : [];
  const columns: ColumnProps<VCurrencyTable>[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'display',
      title: 'Display',
    },
    {
      key: 'symbol',
      title: 'Symbol',
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
              formValues: CurrencyTransformer.VFCurrencyTransformer(item.raw),
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
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Categories</h2>
        <BasicButton onClick={() => send({ type: 'TO_CREATE' })}>Create</BasicButton>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        {!data ? <LoadingSpinner className="h-full" /> : <Table data={tableData} columns={columns} />}
      </div>

      <CurrencyModifier
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
