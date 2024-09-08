import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import Drawer from '@/components/Drawer';
import { CategoryConstant } from '@/constant';
import { FCategory, Id, NType } from '@/types';
import { CategoryValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FCategory>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FCategory) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FCategory, id: Id) => void;
}

export default function CategoryModifier(props: Props) {
  const { className = '', onUpdate, isOpen, onClose, mode, defaultValues, id, onDelete, onCreate } = props;

  const _defaultValues = useMemo<FCategory>(
    () => defaultValues || CategoryConstant.F_CATEGORY_INITIAL_VALUES,
    [defaultValues],
  );

  const { register, handleSubmit, formState, reset } = useForm<FCategory>({
    defaultValues: _defaultValues,
    resolver: zodResolver(CategoryValidator.FCategoryValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title: string = useMemo(() => (mode ? `${mode} category` : ''), [mode]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title}>
      <form
        onSubmit={handleSubmit((data) => {
          // onUpdate(data, id);
          if (mode === 'create') onCreate(data);
          if (mode === 'edit' && id) onUpdate(data, id);
          reset();
        })}
        className="flex flex-col gap-y-4 p-4"
      >
        <BasicInput register={register} path="name" />
        <BasicInput register={register} path="comment" />
        <div className="flex gap-2">
          <BasicButton type="submit" className="grow">
            update
          </BasicButton>
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
