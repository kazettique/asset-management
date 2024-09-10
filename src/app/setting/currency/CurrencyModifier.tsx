import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicDrawer from '@/components/BasicDrawer';
import BasicInput from '@/components/BasicInput';
import { CurrencyConstant } from '@/constant';
import { FCurrency, Id, NType } from '@/types';
import { CurrencyValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FCurrency>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FCurrency) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FCurrency, id: Id) => void;
}

export default function CurrencyModifier(props: Props) {
  const { className = '', defaultValues, id, isOpen, mode, onClose, onCreate, onUpdate } = props;

  const _defaultValues = useMemo<FCurrency>(
    () => defaultValues || CurrencyConstant.F_CURRENCY_INITIAL_VALUES,
    [defaultValues],
  );

  const { register, handleSubmit, formState, reset } = useForm<FCurrency>({
    defaultValues: _defaultValues,
    resolver: zodResolver(CurrencyValidator.FCurrencyValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} currency` : ''), [mode]);

  return (
    <BasicDrawer isOpen={isOpen} onClose={onClose} title={title}>
      <form
        onSubmit={handleSubmit((data) => {
          if (mode === 'create') onCreate(data);
          if (mode === 'edit' && id) onUpdate(data, id);
          reset();
        })}
        className="flex flex-col gap-y-4 p-4"
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
        <BasicButton type="submit">Submit</BasicButton>
      </form>
    </BasicDrawer>
  );
}
