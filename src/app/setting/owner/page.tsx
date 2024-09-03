'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import BasicButton from '@/components/BasicButton';
import Table, { ColumnProps } from '@/components/Table';
import { OwnerFetcher } from '@/fetcher';
import { OwnerTransformer } from '@/transformer';
import { FOwner, Id, NType, VOwner, VOwnerTable } from '@/types';

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

  const tableData: VOwnerTable[] = data ? data.data.map((item) => OwnerTransformer.VTOwnerTransformer(item)) : [];
  const columns: ColumnProps<VOwnerTable>[] = [
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
          className="bg-slate-500 p-1 rounded-sm text-white"
          onClick={() => onItemEdit(item.raw)}
        >
          Edit
        </BasicButton>
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">owner setting</div>
      {isPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
