'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { TagFetcher } from '@/fetcher';
import { tagMachine } from '@/machines';
import { TagTransformer } from '@/transformer';
import { FTag, Id, VTag, VTagTable } from '@/types';

import TagModifier from './TagModifier';

export default function Page() {
  const [state, send] = useMachine(tagMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => TagFetcher.FindAll(),
    queryKey: ['tagList'],
  });

  const createTag = useMutation({
    mutationFn: (payload: FTag) => TagFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateTag = useMutation({
    mutationFn: ({ payload, id }: { id: VTag['id']; payload: FTag }) => TagFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteTag = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return TagFetcher.Delete(id);
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

  const onItemUpdate = (tag: FTag, id: VTag['id']): void => {
    updateTag.mutate({ id, payload: tag });
  };

  const onItemDelete = (id: VTag['id']): void => {
    deleteTag.mutate(id);
  };

  const onCreateSubmit = (data: FTag) => {
    createTag.mutate(data);
  };

  const tableData: VTagTable[] = data ? data.data.map((item) => TagTransformer.VTTagTransformer(item)) : [];
  const columns: ColumnProps<VTagTable>[] = [
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
            void send({ formValues: TagTransformer.VFTagTransformer(item.raw), id: item.raw.id, type: 'TO_EDIT' })
          }
        />
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Tags</h2>
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

      <TagModifier
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
