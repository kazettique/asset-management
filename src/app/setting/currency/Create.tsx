import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import BasicInput from '@/components/BasicInput';
import { CurrencyConstant } from '@/constant';
import { FCurrency } from '@/types';
import { CurrencyValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FCurrency) => void;
}

export default function Create(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset } = useForm<FCurrency>({
    defaultValues: CurrencyConstant.F_CURRENCY_INITIAL_VALUES,
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
          <BasicInput register={register} path="name" />
          {formState.errors.name && <div className="text-red-500">{formState.errors.name.message}</div>}
        </div>
        <div>
          <BasicInput register={register} path="display" />
          {formState.errors.display && <div className="text-red-500">{formState.errors.display.message}</div>}
        </div>
        <div>
          <BasicInput register={register} path="symbol" />
          {formState.errors.symbol && <div className="text-red-500">{formState.errors.symbol.message}</div>}
        </div>
        <div>
          <BasicInput register={register} path="comment" />
          {formState.errors.comment && <div className="text-red-500">{formState.errors.comment.message}</div>}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
