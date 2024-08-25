'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { CategoryFetcher } from '@/fetcher';
import { FCreateCategory, FUpdateCategory, Id, NType, VCategory } from '@/type';

import CategoryItem from './CategoryItem';
import CreateCategory from './CreateCategory';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VCategory>>(null);

  const { data, isPending, isError, refetch } = useQuery({
    queryFn: () => CategoryFetcher.getAllCategory(),
    queryKey: ['categoryList'],
  });

  const createCategory = useMutation({
    mutationFn: (payload: FCreateCategory) => CategoryFetcher.createCategory(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateCategory = useMutation({
    mutationFn: (payload: VCategory) => CategoryFetcher.updateCategory(payload),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return CategoryFetcher.deleteCategory(id);
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

  const onItemUpdate = (category: VCategory): void => {
    updateCategory.mutate(category);
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VCategory['id']): void => {
    deleteCategory.mutate(id);
  };

  const onCreateSubmit = (data: FCreateCategory) => {
    createCategory.mutate(data);
  };

  const onUpdateSubmit = (data: FUpdateCategory) => {
    updateCategory.mutate(data);
  };

  return (
    <div>
      <div className="font-bold capitalize">category setting page</div>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <div className="p-8">
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
                  <CategoryItem
                    key={item.id}
                    category={item}
                    isEdit={editItem !== null ? item.id === editItem.id : false}
                    onCancel={() => onItemCancel()}
                    onEdit={(category) => onItemEdit(category)}
                    onDelete={(id) => onItemDelete(id)}
                    onUpdate={(category) => onItemUpdate(category)}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateCategory onSubmit={onCreateSubmit} />
    </div>
  );
}
