import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicDrawer from '@/components/BasicDrawer';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import BasicSelect from '@/components/BasicSelect';
import { CommonConstant, MethodConstant } from '@/constant';
import { FMethod, Id, NType } from '@/types';
import { MethodValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FMethod>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FMethod) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FMethod, id: Id) => void;
}

export default function MethodModifier(props: Props) {
  const { className = '', defaultValues, id, isOpen, mode, onClose, onCreate, onDelete, onUpdate } = props;

  const _defaultValues = useMemo<FMethod>(
    () => defaultValues || MethodConstant.F_METHOD_INITIAL_VALUES,
    [defaultValues],
  );

  const { register, handleSubmit, reset, control, formState } = useForm<FMethod>({
    defaultValues: _defaultValues,
    mode: 'onChange',
    resolver: zodResolver(MethodValidator.FMethodValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} method` : ''), [mode]);

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
        <BasicInput register={register} path="name" />
        <BasicInput register={register} path="comment" />
        {/* TODO: need fix */}
        <BasicSelect control={control} path="type" options={CommonConstant.METHOD_TYPE_OPTIONS} />
        <div className="flex gap-2">
          {mode && (
            <BasicButton type="submit" className="grow">
              {mode === 'create' ? 'create' : 'update'}
            </BasicButton>
          )}
          {mode === 'edit' && (
            <BasicButton
              variant="danger"
              onClick={() => {
                if (id) onDelete(id);
              }}
            >
              <BasicIcon iconType="xmark-solid" />
            </BasicButton>
          )}
        </div>
        <div>{formState.errors.type?.message}</div>
      </form>
    </BasicDrawer>
  );
}
