'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Button from '@/components/Button';
import Table, { ColumnProps } from '@/components/Table';
import { PlaceFetcher } from '@/fetcher';
import { PlaceTransformer } from '@/transformer';
import { FPlace, Id, NType, VPlace, VPlaceTable } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VPlace>>(null);

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
      setEditItem(null);
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

  const onItemEdit = (place: VPlace): void => {
    setEditItem(place);
  };

  const onItemUpdate = (place: FPlace, id: VPlace['id']): void => {
    updatePlace.mutate({ id, payload: place });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
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
        <Button
          variant="secondary"
          className="bg-slate-500 p-1 rounded-sm text-white"
          onClick={() => onItemEdit(item.raw)}
        >
          Edit
        </Button>
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">place setting</div>
      {isPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
