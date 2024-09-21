'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { MethodFetcher } from '@/fetcher';
import { methodMachine } from '@/machines';
import { MethodTransformer } from '@/transformer';
import { FMethod, Id, VMethod, VMethodTable } from '@/types';

import MethodModifier from './MethodModifier';

export default function Page() {
  const [state, send] = useMachine(methodMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => MethodFetcher.FindAll(),
    queryKey: ['methodList'],
  });

  const createMethod = useMutation({
    mutationFn: (payload: FMethod) => MethodFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateMethod = useMutation({
    mutationFn: ({ payload, id }: { id: VMethod['id']; payload: FMethod }) => MethodFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteMethod = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return MethodFetcher.Delete(id);
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

  const onItemUpdate = (method: FMethod, id: VMethod['id']): void => {
    updateMethod.mutate({ id, payload: method });
  };

  const onItemDelete = (id: VMethod['id']): void => {
    deleteMethod.mutate(id);
  };

  const onCreateSubmit = (data: FMethod) => {
    createMethod.mutate(data);
  };

  const tableData: VMethodTable[] = data ? data.data.map((item) => MethodTransformer.VTMethodTransformer(item)) : [];
  const columns: ColumnProps<VMethodTable>[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'type',
      title: 'Type',
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
            void send({ formValues: MethodTransformer.VFMethodTransformer(item.raw), id: item.raw.id, type: 'TO_EDIT' })
          }
        />
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Methods</h2>
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

      <MethodModifier
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
