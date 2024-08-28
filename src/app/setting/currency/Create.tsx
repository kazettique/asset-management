import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { F_CURRENCY_INITIAL_VALUES } from '@/constant';
import { FCurrency } from '@/types';
import { CurrencyValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FCurrency) => void;
}

export default function Create(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset } = useForm<FCurrency>({
    defaultValues: F_CURRENCY_INITIAL_VALUES,
    resolver: zodResolver(CurrencyValidator.FCurrencyValidator),
  });

  return (
    <div className={`border border-slate-600 rounded-sm p-2 flex flex-col gap-y-4 mt-4 ${className}`}>
      <div className="font-bold text-xl">Create Currency</div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input {...register('name')} className="bg-slate-300" />
          {formState.errors.name && <div className="text-red-500">{formState.errors.name.message}</div>}
        </div>
        <div>
          <label htmlFor="display">Display: </label>
          <input {...register('display')} className="bg-slate-300" />
          {formState.errors.display && <div className="text-red-500">{formState.errors.display.message}</div>}
        </div>
        <div>
          <label htmlFor="symbol">Symbol: </label>
          <input {...register('symbol')} className="bg-slate-300" />
          {formState.errors.symbol && <div className="text-red-500">{formState.errors.symbol.message}</div>}
        </div>
        <div>
          <label htmlFor="comment">Comment: </label>
          <input {...register('comment')} className="bg-slate-300" />
          {formState.errors.comment && <div className="text-red-500">{formState.errors.comment.message}</div>}
        </div>
        <button type="submit" className="bg-slate-400 hover:bg-slate-500 p-2 m-4 rounded-sm">
          Submit
        </button>
      </form>
    </div>
  );
}
