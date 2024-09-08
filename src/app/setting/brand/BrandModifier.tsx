import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import Drawer from '@/components/Drawer';
import { BrandConstant } from '@/constant';
import { FBrand, Id, NType } from '@/types';
import { BrandValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FBrand>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FBrand) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FBrand, id: Id) => void;
}

export default function BrandModifier(props: Props) {
  const { className = '', defaultValues, id, isOpen, mode, onClose, onCreate, onDelete, onUpdate } = props;

  const _defaultValues = useMemo<FBrand>(() => defaultValues || BrandConstant.F_BRAND_INITIAL_VALUES, [defaultValues]);

  const { register, handleSubmit, formState, reset } = useForm<FBrand>({
    defaultValues: _defaultValues,
    resolver: zodResolver(BrandValidator.FBrandValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} category` : ''), [mode]);

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
