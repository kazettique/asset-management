import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicDrawer from '@/components/BasicDrawer';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import BasicTextArea from '@/components/BasicTextArea';
import { QuoteConstant } from '@/constant';
import { FQuote, Id, NType } from '@/types';
import { QuoteValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FQuote>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FQuote) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FQuote, id: Id) => void;
}

export default function QuoteModifier(props: Props) {
  const { className = '', defaultValues, id, isOpen, mode, onClose, onCreate, onDelete, onUpdate } = props;

  const _defaultValues = useMemo<FQuote>(() => defaultValues || QuoteConstant.F_QUOTE_INITIAL_VALUES, [defaultValues]);

  const { register, handleSubmit, reset } = useForm<FQuote>({
    defaultValues: _defaultValues,
    resolver: zodResolver(QuoteValidator.FQuoteValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} quote` : ''), [mode]);

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
        <BasicTextArea register={register} path="quote" />
        <BasicInput register={register} path="author" />
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
      </form>
    </BasicDrawer>
  );
}
