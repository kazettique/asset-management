import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import Drawer from '@/components/Drawer';
import { PlatformConstant } from '@/constant';
import { FPlatform, Id, NType } from '@/types';
import { PlatformValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FPlatform>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FPlatform) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FPlatform, id: Id) => void;
}

export default function PlatformModifier(props: Props) {
  const { className = '', defaultValues, id, isOpen, mode, onClose, onCreate, onDelete, onUpdate } = props;

  const _defaultValues = useMemo<FPlatform>(
    () => defaultValues || PlatformConstant.F_PLATFORM_INITIAL_VALUES,
    [defaultValues],
  );

  const { register, handleSubmit, formState, reset } = useForm<FPlatform>({
    defaultValues: _defaultValues,
    resolver: zodResolver(PlatformValidator.FPlatformValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} platform` : ''), [mode]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title}>
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
              <BasicIcon iconType="x-lg" />
            </BasicButton>
          )}
        </div>
      </form>
    </Drawer>
  );
}
