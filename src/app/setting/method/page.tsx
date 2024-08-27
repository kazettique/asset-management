'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { MethodFetcher } from '@/fetcher';
import { FMethod, Id, NType, VMethod } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VMethod>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => MethodFetcher.getAll(),
    queryKey: ['methodList'],
  });

  const createMethod = useMutation({
    mutationFn: (payload: FMethod) => MethodFetcher.create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateMethod = useMutation({
    mutationFn: ({ payload, id }: { id: VMethod['id']; payload: FMethod }) => MethodFetcher.update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteMethod = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return MethodFetcher.delete(id);
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

  const onItemEdit = (method: VMethod): void => {
    setEditItem(method);
  };

  const onItemUpdate = (method: FMethod, id: VMethod['id']): void => {
    updateMethod.mutate({ id, payload: method });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VMethod['id']): void => {
    deleteMethod.mutate(id);
  };

  const onCreateSubmit = (data: FMethod) => {
    createMethod.mutate(data);
  };

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">method setting</div>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <table className="table-fixed border-collapse border border-slate-300 w-full">
          <thead>
            <tr>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">名稱</th>
              <th className="border border-slate-300">名前</th>
              <th className="border border-slate-300">Type</th>
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
                  onEdit={(method) => onItemEdit(method)}
                  onDelete={(id) => onItemDelete(id)}
                  onUpdate={(method) => onItemUpdate(method, item.id)}
                />
              ))}
          </tbody>
        </table>
      )}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
