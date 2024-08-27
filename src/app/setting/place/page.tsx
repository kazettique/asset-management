'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { PlaceFetcher } from '@/fetcher';
import { FPlace, Id, NType, VPlace } from '@/types';

import Create from './Create';
import PlaceItem from './PlaceItem';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VPlace>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => PlaceFetcher.getAllPlace(),
    queryKey: ['placeList'],
  });

  const createPlace = useMutation({
    mutationFn: (payload: FPlace) => PlaceFetcher.createPlace(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updatePlace = useMutation({
    mutationFn: ({ payload, id }: { id: VPlace['id']; payload: FPlace }) => PlaceFetcher.updatePlace(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deletePlace = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return PlaceFetcher.deletePlace(id);
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

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">place setting</div>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <table className="table-fixed border-collapse border border-slate-300 w-full">
          <thead>
            <tr>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">名稱</th>
              <th className="border border-slate-300">名前</th>
              <th className="border border-slate-300">Comment</th>
              <th className="border border-slate-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((item, _index) => (
                <PlaceItem
                  key={item.id}
                  item={item}
                  isEdit={editItem !== null ? item.id === editItem.id : false}
                  onCancel={() => onItemCancel()}
                  onEdit={(place) => onItemEdit(place)}
                  onDelete={(id) => onItemDelete(id)}
                  onUpdate={(place) => onItemUpdate(place, item.id)}
                />
              ))}
          </tbody>
        </table>
      )}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
