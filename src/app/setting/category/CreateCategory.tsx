import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { F_CREATE_CATEGORY_INITIAL_VALUES } from '@/constant';
import { FCreateCategory, NType, VCategory } from '@/type';
import { FCreateCategoryValidator } from '@/validator';

interface Props {
  onSubmit: (data: FCreateCategory) => void;
}

// todo: combine with UpdateCategory
export default function CreateCategory(props: Props) {
  const { register, handleSubmit, formState, reset, setValue } = useForm<FCreateCategory>({
    defaultValues: F_CREATE_CATEGORY_INITIAL_VALUES,
    resolver: zodResolver(FCreateCategoryValidator),
  });

  return (
    <div className="border border-slate-600 rounded-sm p-6 m-10 flex flex-col gap-y-4">
      <div className="font-bold text-xl">Create Category</div>
      <form
        onSubmit={handleSubmit((data) => {
          props.onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
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
  );
}
