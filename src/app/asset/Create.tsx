import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { F_OWNER_INITIAL_VALUES } from '@/constant';
import { FAsset } from '@/types';
import { AssetValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FAsset) => void;
}

export default function Create(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset } = useForm<FAsset>({
    defaultValues: F_OWNER_INITIAL_VALUES,
    resolver: zodResolver(AssetValidator.FAssetValidator),
  });

  return (
    <div className={`border border-slate-600 rounded-sm p-2 flex flex-col gap-y-4 mt-4 ${className}`}>
      <div className="font-bold text-xl">Create Asset</div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
        <div>
          <label htmlFor="name.nameEn">Name: </label>

          <input {...register('name.nameEn')} className="bg-slate-300" />
        </div>
        <div>
          <label htmlFor="name.nameTw">名稱: </label>
          <input {...register('name.nameTw')} className="bg-slate-300" />
        </div>
        <div>
          <label htmlFor="name.nameJp">名前: </label>
          <input {...register('name.nameJp')} className="bg-slate-300" />
        </div>
        <div>
          <label htmlFor="comment">Comment: </label>
          <input {...register('comment')} className="bg-slate-300" />
        </div>
        <button type="submit" className="bg-slate-400 hover:bg-slate-500 p-2 m-4 rounded-sm">
          Submit
        </button>
      </form>
      {formState.errors.name && <div className="text-red-500">{formState.errors.name.message}</div>}
    </div>
  );
}
