import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { FormOption } from '@/types';

export interface Props<
  Values extends FieldValues,
  Option extends FormOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> {
  className?: string;
  control: Control<Values>;
  isCreatable?: boolean;
  isMulti?: IsMulti;
  label?: string;
  options: OptionsOrGroups<Option, Group>;
  path: Path<Values>;
  placeholder?: string;
  // register: UseFormRegister<T>;
}

export default function BasicSelect<
  T extends FieldValues,
  Option extends FormOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: Props<T, Option, IsMulti, Group>) {
  const {
    label = '',
    path,
    className = '',
    options,
    placeholder = 'Please choose',
    isMulti = false,
    isCreatable = false,
    control,
    ...rest
  } = props;

  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Must be deleted once
  // https://github.com/JedWatson/react-select/issues/5459 is fixed.
  useEffect(() => setIsMounted(true), []);

  return (
    <>
      {isMounted ? (
        <Controller
          name={path}
          control={control}
          render={({ field, fieldState, formState }) => (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" htmlFor={path}>
                {label || path}
                {isCreatable ? (
                  <CreatableSelect {...field} id={id} isMulti={isMulti} options={options} placeholder={placeholder} />
                ) : (
                  <Select {...field} id={id} isMulti={isMulti} options={options} placeholder={placeholder} />
                )}
              </label>
              {/* <ErrorMessage errors={formState.errors} name="hello" /> */}
            </div>
          )}
        />
      ) : null}
    </>
  );
}
