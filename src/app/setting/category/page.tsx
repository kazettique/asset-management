'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import BasicButton from '@/components/BasicButton';
import Table, { ColumnProps } from '@/components/Table';
import { CategoryFetcher } from '@/fetcher';
import { CategoryTransformer } from '@/transformer';
import { FCategory, Id, NType, VCategory, VCategoryTable } from '@/types';

import CategoryModifier from './CategoryModifier';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VCategory>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => CategoryFetcher.FindAll(),
    queryKey: ['categoryList'],
  });

  const createCategory = useMutation({
    mutationFn: (payload: FCategory) => CategoryFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ payload, id }: { id: VCategory['id']; payload: FCategory }) => CategoryFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return CategoryFetcher.Delete(id);
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

  const onItemEdit = (category: VCategory): void => {
    setEditItem(category);
  };

  const onItemUpdate = (category: FCategory, id: VCategory['id']): void => {
    updateCategory.mutate({ id, payload: category });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VCategory['id']): void => {
    deleteCategory.mutate(id);
  };

  const onCreateSubmit = (data: FCategory) => {
    createCategory.mutate(data);
  };

  const tableData: VCategoryTable[] = data
    ? data.data.map((item) => CategoryTransformer.VTCategoryTransformer(item))
    : [];
  const columns: ColumnProps<VCategoryTable>[] = [
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
      <div className="font-bold capitalize text-xl my-2">category setting</div>
      {isPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}

      <CategoryModifier onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
