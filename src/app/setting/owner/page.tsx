'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { OwnerFetcher } from '@/fetcher';
import { ownerMachine } from '@/machines';
import { OwnerTransformer } from '@/transformer';
import { FOwner, Id, VOwner, VOwnerTable } from '@/types';

import OwnerModifier from './OwnerModifier';

export default function Page() {
  const [state, send] = useMachine(ownerMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => OwnerFetcher.FindAll(),
    queryKey: ['ownerList'],
  });

  const createOwner = useMutation({
    mutationFn: (payload: FOwner) => OwnerFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateOwner = useMutation({
    mutationFn: ({ payload, id }: { id: VOwner['id']; payload: FOwner }) => OwnerFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteOwner = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return OwnerFetcher.Delete(id);
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

  const onItemUpdate = (owner: FOwner, id: VOwner['id']): void => {
    updateOwner.mutate({ id, payload: owner });
  };

  const onItemDelete = (id: VOwner['id']): void => {
    deleteOwner.mutate(id);
  };

  const onCreateSubmit = (data: FOwner) => {
    createOwner.mutate(data);
  };

  const tableData: VOwnerTable[] = data ? data.data.map((item) => OwnerTransformer.VTOwnerTransformer(item)) : [];
  const columns: ColumnProps<VOwnerTable>[] = [
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
            void send({ formValues: OwnerTransformer.VFOwnerTransformer(item.raw), id: item.raw.id, type: 'TO_EDIT' })
          }
        />
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Owner</h2>
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

      <OwnerModifier
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
