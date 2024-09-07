import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicInput from '@/components/BasicInput';
import { CategoryConstant } from '@/constant';
import { FCategory } from '@/types';
import { CategoryValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FCategory) => void;
}

export default function CategoryModifier(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset } = useForm<FCategory>({
    defaultValues: CategoryConstant.F_CATEGORY_INITIAL_VALUES,
    resolver: zodResolver(CategoryValidator.FCategoryValidator),
  });

  return (
    <div className={`border border-slate-600 rounded-sm p-2 flex flex-col gap-y-4 mt-4 ${className}`}>
      <div className="font-bold text-xl">Create Category</div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
        <BasicInput register={register} path="name" />
        <BasicInput register={register} path="comment" />
        <BasicButton type="submit">Submit</BasicButton>
      </form>
      {formState.errors.name && <div className="text-red-500">{formState.errors.name.message}</div>}
    </div>
  );
}
