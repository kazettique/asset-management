import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicDrawer from '@/components/BasicDrawer';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import { OwnerConstant } from '@/constant';
import { FOwner, Id, NType } from '@/types';
import { OwnerValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FOwner>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FOwner) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FOwner, id: Id) => void;
}

export default function OwnerModifier(props: Props) {
  const { defaultValues, id, isOpen, mode, onClose, onCreate, onDelete, onUpdate } = props;

  const _defaultValues = useMemo<FOwner>(() => defaultValues || OwnerConstant.F_OWNER_INITIAL_VALUES, [defaultValues]);

  const { register, handleSubmit, reset } = useForm<FOwner>({
    defaultValues: _defaultValues,
    resolver: zodResolver(OwnerValidator.FOwnerValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} owner` : ''), [mode]);

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
    </BasicDrawer>
  );
}
