import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import Drawer from '@/components/Drawer';
import { TagConstant } from '@/constant';
import { FTag, Id, NType } from '@/types';
import { TagValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FTag>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FTag) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FTag, id: Id) => void;
}

export default function TagModifier(props: Props) {
  const { className = '', defaultValues, id, isOpen, mode, onClose, onCreate, onDelete, onUpdate } = props;

  const _defaultValues = useMemo<FTag>(() => defaultValues || TagConstant.F_TAG_INITIAL_VALUES, [defaultValues]);

  const { register, handleSubmit, formState, reset } = useForm<FTag>({
    defaultValues: _defaultValues,
    resolver: zodResolver(TagValidator.FTagValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} tag` : ''), [mode]);

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
