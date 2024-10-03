import React, { useEffect, useState } from 'react';
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
  isDisabled?: boolean;
  isMulti?: IsMulti;
  label?: string;
  options: OptionsOrGroups<Option, Group>;
  path: Path<Values>;
  placeholder?: string;
  showLabel?: boolean;
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
    showLabel = true,
    isDisabled = false,
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
            <div className={className}>
              <label className="block text-gray-700 dark:text-gray-50" htmlFor={path}>
                {showLabel && <span className="mb-1">{label || path}</span>}
                {isCreatable ? (
                  <CreatableSelect
                    {...field}
                    id={id}
                    isMulti={isMulti}
                    options={options}
                    placeholder={placeholder}
                    isDisabled={isDisabled}
                  />
                ) : (
                  <Select
                    {...field}
                    id={id}
                    isMulti={isMulti}
                    options={options}
                    placeholder={placeholder}
                    isDisabled={isDisabled}
                  />
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
