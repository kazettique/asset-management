import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import React, { useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';

import BasicButton from '@/components/BasicButton';
import BasicDrawer from '@/components/BasicDrawer';
import BasicInput from '@/components/BasicInput';
import FormToggleSwitch from '@/components/FormToggleSwitch';
import { CommonConstant, SettingConstant } from '@/constant';
import { FSetting, Id, NType, SettingKey } from '@/types';
import { SettingValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FSetting>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FSetting) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FSetting, id: Id) => void;
}

export default function SettingModifier(props: Props) {
  const { className = '', defaultValues, id, isOpen, mode, onClose, onCreate, onDelete, onUpdate } = props;

  const _defaultValues = useMemo<FSetting>(
    () => defaultValues || SettingConstant.F_SETTING_INITIAL_VALUES,
    [defaultValues],
  );

  const { register, handleSubmit, formState, reset, control, setValue } = useForm<FSetting>({
    defaultValues: _defaultValues,
    resolver: zodResolver(SettingValidator.FSettingValidator),
  });

  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} setting` : ''), [mode]);

  const key = useWatch({ control, name: 'key' });
  const value = useWatch({ control, name: 'value' });

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
        <BasicInput register={register} path="key" disabled />

        {key === SettingKey.DISPLAY_FOREX && (
          <>
            <label className="block dark:text-gray-50 text-gray-700" htmlFor="value">
              value
            </label>
            <Select
              value={CommonConstant.CURRENCY_CODE_ALL_OPTIONS.find((option) => option.value === value)}
              isMulti={false}
              options={CommonConstant.CURRENCY_CODE_ALL_OPTIONS}
              onChange={(event) => event && void setValue('value', event.value)}
            />
          </>
        )}

        {key === SettingKey.SHOW_CENSOR_ASSET && <FormToggleSwitch register={register} path="value" />}

        {key === SettingKey.CURRENCY_OPTION_LIST && (
          <>
            <label className="block dark:text-gray-50 text-gray-700" htmlFor="value">
              value
            </label>
            <Select
              isMulti
              value={CommonConstant.CURRENCY_CODE_ALL_OPTIONS.filter(
                (option) => Array.isArray(value) && value.includes(option.value),
              )}
              options={CommonConstant.CURRENCY_CODE_ALL_OPTIONS}
              onChange={(event) =>
                void setValue(
                  'value',
                  event.map((item) => item.value),
                )
              }
            />
          </>
        )}

        <div className="flex gap-2">
          {mode && (
            <BasicButton type="submit" className="grow">
              {mode === 'create' ? 'create' : 'update'}
            </BasicButton>
          )}
        </div>
      </form>
    </BasicDrawer>
  );
}
