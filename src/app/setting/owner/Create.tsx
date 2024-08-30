import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { OwnerConstant } from '@/constant';
import { FOwner } from '@/types';
import { OwnerValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FOwner) => void;
}

export default function Create(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset } = useForm<FOwner>({
    defaultValues: OwnerConstant.F_OWNER_INITIAL_VALUES,
    resolver: zodResolver(OwnerValidator.FOwnerValidator),
  });

  return (
    <div className={`border border-slate-600 rounded-sm p-2 flex flex-col gap-y-4 mt-4 ${className}`}>
      <div className="font-bold text-xl">Create Owner</div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
        <Input register={register} path="name.nameEn" />
        <Input register={register} path="name.nameTw" />
        <Input register={register} path="name.nameJp" />
        <Input register={register} path="comment" />
        <Button type="submit">Submit</Button>
      </form>
      {formState.errors.name && <div className="text-red-500">{formState.errors.name.message}</div>}
    </div>
  );
}
