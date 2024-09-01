'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Button from '@/components/Button';
import Table, { ColumnProps } from '@/components/Table';
import { TagFetcher } from '@/fetcher';
import { TagTransformer } from '@/transformer';
import { FTag, Id, NType, VTag, VTagTable } from '@/types';

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
      <div className="font-bold capitalize text-xl my-2">tag setting</div>
      {isPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
