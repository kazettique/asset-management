import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PlaceConstant } from '@/constant';
import { FPlace } from '@/types';
import { PlaceValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FPlace) => void;
}

export default function Create(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset } = useForm<FPlace>({
    defaultValues: PlaceConstant.F_PLACE_INITIAL_VALUES,
    resolver: zodResolver(PlaceValidator.FPlaceValidator),
  });

  return (
    <div className={`border border-slate-600 rounded-sm p-2 flex flex-col gap-y-4 mt-4 ${className}`}>
      <div className="font-bold text-xl">Create Place</div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
        <div>
          <label htmlFor="name.nameEn">Name: </label>

          <input {...register('name.nameEn')} name="name.nameEn" className="bg-slate-300" />
        </div>
        <div>
          <label htmlFor="name.nameTw">名稱: </label>
          <input {...register('name.nameTw')} name="name.nameTw" className="bg-slate-300" />
        </div>
        <div>
          <label htmlFor="name.nameJp">名前: </label>
          <input {...register('name.nameJp')} name="name.nameJp" className="bg-slate-300" />
        </div>
        <div>
          <label htmlFor="comment">Comment: </label>
          <input {...register('comment')} name="comment" className="bg-slate-300" />
        </div>
        <button type="submit" className="bg-slate-400 hover:bg-slate-500 p-2 m-4 rounded-sm">
          Submit
        </button>
      </form>
      {formState.errors.name && <div className="text-red-500">{formState.errors.name.message}</div>}
    </div>
  );
}
