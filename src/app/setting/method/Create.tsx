import { zodResolver } from '@hookform/resolvers/zod';
import { MethodType } from '@prisma/client';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { MethodConstant } from '@/constant';
import { FMethod } from '@/types';
import { MethodValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FMethod) => void;
}

export default function Create(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset } = useForm<FMethod>({
    defaultValues: MethodConstant.F_METHOD_INITIAL_VALUES,
    resolver: zodResolver(MethodValidator.FMethodValidator),
  });

  const options = [
    {
      label: MethodType.START,
      value: MethodType.START,
    },
    {
      label: MethodType.END,
      value: MethodType.END,
    },
  ];

  return (
    <div className={`border border-slate-600 rounded-sm p-2 flex flex-col gap-y-4 mt-4 ${className}`}>
      <div className="font-bold text-xl">Create Method</div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
        <Input register={register} path="name" />
        <Input register={register} path="comment" />
        <Button type="submit">Submit</Button>
      </form>
      {formState.errors.name && <div className="text-red-500">{formState.errors.name.message}</div>}
    </div>
  );
}
