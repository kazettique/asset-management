'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import BasicButton from '@/components/BasicButton';
import Table, { ColumnProps } from '@/components/Table';
import { MethodFetcher } from '@/fetcher';
import { MethodTransformer } from '@/transformer';
import { FMethod, Id, NType, VMethod, VMethodTable } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VMethod>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => MethodFetcher.FindAll(),
    queryKey: ['methodList'],
  });

  const createMethod = useMutation({
    mutationFn: (payload: FMethod) => MethodFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateMethod = useMutation({
    mutationFn: ({ payload, id }: { id: VMethod['id']; payload: FMethod }) => MethodFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteMethod = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return MethodFetcher.Delete(id);
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

  const tableData: VMethodTable[] = data ? data.data.map((item) => MethodTransformer.VTMethodTransformer(item)) : [];
  const columns: ColumnProps<VMethodTable>[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'type',
      title: 'Type',
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
      <div className="font-bold capitalize text-xl my-2">method setting</div>
      {isPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
