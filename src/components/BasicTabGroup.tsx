import React from 'react';
import { Control, FieldValues, Path, UseFormRegister, useWatch } from 'react-hook-form';

import { FormOption } from '@/types';

interface Props<Values extends FieldValues, Option extends FormOption> {
  className?: string;
  control: Control<Values>;
  label?: string;
  options: Option[];
  path: Path<Values>;
  register: UseFormRegister<Values>;
  showLabel?: boolean;
}

export default function BasicTabGroup<Values extends FieldValues, Option extends FormOption>(
  props: Props<Values, Option>,
) {
  const { className = '', register, path, options, showLabel = true, control } = props;

  const values = useWatch({ control, name: path });

  return (
    <>
      <div
        className={`inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700 ${className}`}
        data-test-comp={BasicTabGroup.name}
      >
        {options.map((option) => (
          <label
            key={option.value}
            data-is-active={values === option.value}
            className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 data-[is-active='true']:bg-gray-100 sm:text-sm data-[is-active='true']:dark:bg-gray-800 dark:text-gray-300 data-[is-active='false']:cursor-pointer capitalize"
          >
            {showLabel && <span>{option.label}</span>}
            <input {...register(path)} type="radio" className="hidden" value={option.value} />
          </label>
        ))}
      </div>
    </>
  );
}
