import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FCreateCategory, FUpdateCategory, VCategory } from '@/type';
import { FUpdateCategoryValidator } from '@/validator';

interface Props {
  category: VCategory;
  onSubmit: (data: FUpdateCategory) => void;
}

// todo: combine with CreateCategory
export default function UpdateCategory(props: Props) {
  const { register, handleSubmit, formState, reset, setValue } = useForm<FUpdateCategory>({
    defaultValues: props.category,
    resolver: zodResolver(FUpdateCategoryValidator),
  });

  return (
    <div className="border border-slate-600 rounded-sm p-6 m-10 flex flex-col gap-y-4">
      <div className="font-bold text-xl">Update Category</div>
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
