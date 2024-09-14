'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { PlaceFetcher } from '@/fetcher';
import { placeMachine } from '@/machines/place';
import { PlaceTransformer } from '@/transformer';
import { FPlace, Id, VPlace, VPlaceTable } from '@/types';

import PlaceModifier from './PlaceModifier';

export default function Page() {
  const [state, send] = useMachine(placeMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => PlaceFetcher.FindAll(),
    queryKey: ['placeList'],
  });

  const createPlace = useMutation({
    mutationFn: (payload: FPlace) => PlaceFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updatePlace = useMutation({
    mutationFn: ({ payload, id }: { id: VPlace['id']; payload: FPlace }) => PlaceFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deletePlace = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return PlaceFetcher.Delete(id);
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

  const onItemUpdate = (place: FPlace, id: VPlace['id']): void => {
    updatePlace.mutate({ id, payload: place });
  };

  const onItemDelete = (id: VPlace['id']): void => {
    deletePlace.mutate(id);
  };

  const onCreateSubmit = (data: FPlace) => {
    createPlace.mutate(data);
  };

  const tableData: VPlaceTable[] = data ? data.data.map((item) => PlaceTransformer.VTPlaceTransformer(item)) : [];
  const columns: ColumnProps<VPlaceTable>[] = [
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
            void send({ formValues: PlaceTransformer.VFPlaceTransformer(item.raw), id: item.raw.id, type: 'TO_EDIT' })
          }
        />
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Places</h2>
        <BasicButton onClick={() => send({ type: 'TO_CREATE' })}>Create</BasicButton>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        {!data ? <LoadingSpinner className="h-full" /> : <Table data={tableData} columns={columns} />}
      </div>

      <PlaceModifier
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
