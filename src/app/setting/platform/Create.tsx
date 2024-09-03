import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicInput from '@/components/BasicInput';
import { PlatformConstant } from '@/constant';
import { FPlatform } from '@/types';
import { PlatformValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FPlatform) => void;
}

export default function Create(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset } = useForm<FPlatform>({
    defaultValues: PlatformConstant.F_PLATFORM_INITIAL_VALUES,
    resolver: zodResolver(PlatformValidator.FPlatformValidator),
  });

  return (
    <div className={`border border-slate-600 rounded-sm p-2 flex flex-col gap-y-4 mt-4 ${className}`}>
      <div className="font-bold text-xl">Create Platform</div>
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
