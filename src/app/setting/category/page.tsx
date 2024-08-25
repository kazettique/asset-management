'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { F_CREATE_CATEGORY_INITIAL_VALUES } from '@/constant';
import { CategoryFetcher } from '@/fetcher';
import { FCreateCategory, Name, NString, VCategory } from '@/type';
import { FCreateCategoryValidator, NameValidator } from '@/validator';

export default function Page() {
  const [editItem, setEditItem] = useState<NString>(null);

  const { register, handleSubmit, watch, formState, getValues, reset } = useForm<FCreateCategory>({
    defaultValues: F_CREATE_CATEGORY_INITIAL_VALUES,
    resolver: zodResolver(FCreateCategoryValidator),
  });

  const { data, isPending, isError, refetch } = useQuery({
    queryFn: () => CategoryFetcher.getAllCategory(),
    queryKey: ['categoryList'],
  });

  const mutation = useMutation({
    mutationFn: (payload: FCreateCategory) => CategoryFetcher.createCategory(payload),
    onSuccess: () => {
      refetch();
      reset();
    },
  });

  const onSubmit = (data: FCreateCategory) => mutation.mutate(data);

  return (
    <div>
      <div className="font-bold capitalize">category setting page</div>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <table className="table-auto border-collapse border border-slate-300">
          <thead>
            <tr>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">名稱</th>
              <th className="border border-slate-300">名前</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.map((item, _index) => (
                <tr key={item.id}>
                  <td className="border border-slate-300">{item.name.nameEn}</td>
                  <td className="border border-slate-300">{item.name.nameTw}</td>
                  <td className="border border-slate-300">{item.name.nameJp}</td>
                  <td className="border border-slate-300">
                    <button onClick={() => setEditItem(item.id)} onBlur={() => setEditItem(null)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <hr className="my-4" />

      {editItem && <div>{editItem}</div>}

      <div className="border border-slate-600 rounded-sm p-6 m-4 flex flex-col gap-y-4">
        <div className="font-bold text-xl">Create category</div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          <div>
            <label htmlFor="nameEn">Name: </label>
            <input {...register('nameEn')} name="nameEn" className="bg-slate-200" />
          </div>
          <div>
            <label htmlFor="nameTw">名稱: </label>
            <input {...register('nameTw')} name="nameTw" className="bg-slate-200" />
          </div>
          <div>
            <label htmlFor="nameTw">名前: </label>
            <input {...register('nameJp')} name="nameJp" className="bg-slate-200" />
          </div>
          <div>
            <label htmlFor="comment">Comment: </label>
            <input {...register('comment')} name="comment" className="bg-slate-200" />
          </div>
          <button type="submit" className="bg-slate-400 hover:bg-slate-500 p-2 m-4 rounded-sm">
            Submit
          </button>
        </form>
        {formState.errors.nameEn && <div className="text-red-500">{formState.errors.nameEn.message}</div>}
      </div>
    </div>
  );
}
