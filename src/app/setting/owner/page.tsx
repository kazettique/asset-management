'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { OwnerFetcher } from '@/fetcher';
import { FOwner, Id, NType, VOwner } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VOwner>>(null);

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
      setEditItem(null);
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

  const onItemEdit = (owner: VOwner): void => {
    setEditItem(owner);
  };

  const onItemUpdate = (owner: FOwner, id: VOwner['id']): void => {
    updateOwner.mutate({ id, payload: owner });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VOwner['id']): void => {
    deleteOwner.mutate(id);
  };

  const onCreateSubmit = (data: FOwner) => {
    createOwner.mutate(data);
  };

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">owner setting</div>
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
                <Item
                  key={item.id}
                  item={item}
                  isEdit={editItem !== null ? item.id === editItem.id : false}
                  onCancel={() => onItemCancel()}
                  onEdit={(owner) => onItemEdit(owner)}
                  onDelete={(id) => onItemDelete(id)}
                  onUpdate={(owner) => onItemUpdate(owner, item.id)}
                />
              ))}
          </tbody>
        </table>
      )}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
