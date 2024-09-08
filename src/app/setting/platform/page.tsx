'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { useState } from 'react';

import BasicButton from '@/components/BasicButton';
import BasicFileReaderComp from '@/components/BasicFileReader';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { PlatformFetcher } from '@/fetcher';
import { placeMachine } from '@/machines/place';
import { PlaceTransformer, PlatformTransformer } from '@/transformer';
import { FPlatform, Id, NType, VPlatform, VPlatformTable } from '@/types';

import PlatformModifier from './PlatformModifier';

export default function Page() {
  const [state, send] = useMachine(placeMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => PlatformFetcher.FindAll(),
    queryKey: ['platformList'],
  });

  const createPlatform = useMutation({
    mutationFn: (payload: FPlatform) => PlatformFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updatePlatform = useMutation({
    mutationFn: ({ payload, id }: { id: VPlatform['id']; payload: FPlatform }) => PlatformFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deletePlatform = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return PlatformFetcher.Delete(id);
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

  const onItemUpdate = (platform: FPlatform, id: VPlatform['id']): void => {
    updatePlatform.mutate({ id, payload: platform });
  };

  const onItemDelete = (id: VPlatform['id']): void => {
    deletePlatform.mutate(id);
  };

  const onCreateSubmit = (data: FPlatform) => {
    createPlatform.mutate(data);
  };

  const tableData: VPlatformTable[] = data
    ? data.data.map((item) => PlatformTransformer.VTPlatformTransformer(item))
    : [];
  const columns: ColumnProps<VPlatformTable>[] = [
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
        <BasicButton
          variant="secondary"
          onClick={() =>
            send({ formValues: PlaceTransformer.VFPlaceTransformer(item.raw), id: item.raw.id, type: 'TO_EDIT' })
          }
        >
          <BasicIcon iconType="pen-to-square-solid" />
        </BasicButton>
      ),
      title: 'Action',
    },
  ];

  const handleChange = async (event: any) => {
    // console.log('event', event);
    refetch();
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Categories</h2>
        <BasicButton onClick={() => send({ type: 'TO_CREATE' })}>Create</BasicButton>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        {!data ? <LoadingSpinner className="h-full" /> : <Table data={tableData} columns={columns} />}
      </div>

      <PlatformModifier
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
