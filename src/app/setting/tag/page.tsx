'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { TagFetcher } from '@/fetcher';
import { FTag, Id, NType, VTag } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VTag>>(null);

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
      setEditItem(null);
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

  const onItemEdit = (tag: VTag): void => {
    setEditItem(tag);
  };

  const onItemUpdate = (tag: FTag, id: VTag['id']): void => {
    updateTag.mutate({ id, payload: tag });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VTag['id']): void => {
    deleteTag.mutate(id);
  };

  const onCreateSubmit = (data: FTag) => {
    createTag.mutate(data);
  };

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">tag setting</div>
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
                  onEdit={(tag) => onItemEdit(tag)}
                  onDelete={(id) => onItemDelete(id)}
                  onUpdate={(tag) => onItemUpdate(tag, item.id)}
                />
              ))}
          </tbody>
        </table>
      )}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
