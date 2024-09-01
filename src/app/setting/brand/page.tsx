'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Button from '@/components/Button';
import Table, { ColumnProps } from '@/components/Table';
import { BrandFetcher } from '@/fetcher';
import { BrandTransformer } from '@/transformer';
import { FBrand, Id, NType, VBrand, VBrandTable } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VBrand>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => BrandFetcher.FindAll(),
    queryKey: ['brandList'],
  });

  const createBrand = useMutation({
    mutationFn: (payload: FBrand) => BrandFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateBrand = useMutation({
    mutationFn: ({ payload, id }: { id: VBrand['id']; payload: FBrand }) => BrandFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteBrand = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return BrandFetcher.Delete(id);
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

  const onItemEdit = (brand: VBrand): void => {
    setEditItem(brand);
  };

  const onItemUpdate = (brand: FBrand, id: VBrand['id']): void => {
    updateBrand.mutate({ id, payload: brand });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VBrand['id']): void => {
    deleteBrand.mutate(id);
  };

  const onCreateSubmit = (data: FBrand) => {
    createBrand.mutate(data);
  };

  const tableData: VBrandTable[] = data ? data.data.map((item) => BrandTransformer.VTBrandTransformer(item)) : [];
  const columns: ColumnProps<VBrandTable>[] = [
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
      <div className="font-bold capitalize text-xl my-2">brand setting</div>
      {isPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
