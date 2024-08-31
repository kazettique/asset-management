'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { PlatformFetcher } from '@/fetcher';
import { FPlatform, Id, NType, VPlatform } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VPlatform>>(null);

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
      setEditItem(null);
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

  const onItemEdit = (platform: VPlatform): void => {
    setEditItem(platform);
  };

  const onItemUpdate = (platform: FPlatform, id: VPlatform['id']): void => {
    updatePlatform.mutate({ id, payload: platform });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VPlatform['id']): void => {
    deletePlatform.mutate(id);
  };

  const onCreateSubmit = (data: FPlatform) => {
    createPlatform.mutate(data);
  };

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">platform setting</div>
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
                  onEdit={(platform) => onItemEdit(platform)}
                  onDelete={(id) => onItemDelete(id)}
                  onUpdate={(platform) => onItemUpdate(platform, item.id)}
                />
              ))}
          </tbody>
        </table>
      )}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
