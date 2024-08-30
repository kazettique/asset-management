import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
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
