'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { BrandFetcher } from '@/fetcher';
import { FBrand, Id, NType, VBrand } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VBrand>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => BrandFetcher.getAll(),
    queryKey: ['brandList'],
  });

  const createBrand = useMutation({
    mutationFn: (payload: FBrand) => BrandFetcher.create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateBrand = useMutation({
    mutationFn: ({ payload, id }: { id: VBrand['id']; payload: FBrand }) => BrandFetcher.update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteBrand = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return BrandFetcher.delete(id);
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

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">brand setting</div>
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
                  onEdit={(brand) => onItemEdit(brand)}
                  onDelete={(id) => onItemDelete(id)}
                  onUpdate={(brand) => onItemUpdate(brand, item.id)}
                />
              ))}
          </tbody>
        </table>
      )}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
