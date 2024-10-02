import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, UseFormRegister, useWatch } from 'react-hook-form';

import BasicIcon from './BasicIcon';

interface Props<T extends FieldValues>
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  control: Control<T>;
  label?: string;
  path: Path<T>;
  register: UseFormRegister<T>;
  showLabel?: boolean;
}

export default function SearchInput<T extends FieldValues>(props: Props<T>) {
  const {
    label = '',
    path,
    register,
    className = '',
    placeholder = 'type keyword',
    showLabel = false,
    control,
    ...rest
  } = props;

  const value = useWatch({ control, name: path });

  return (
    <div className={`flex gap-x-2 flex-col ${className}`} data-test-comp={SearchInput.name}>
      {showLabel && (
        <label className="block dark:text-gray-50 text-gray-700" htmlFor={path}>
          {label || path}
        </label>
      )}
      <div className="flex items-center gap-x-2 px-2 h-10 border mt-1 rounded w-full bg-gray-50 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50">
        <BasicIcon iconType="magnifying-glass-solid" className="text-gray-400 dark:text-gray-600 font-light" />
        <input
          {...register(path)}
          {...rest}
          value={value}
          placeholder={placeholder}
          className="w-32 h-full focus:outline-0 bg-gray-50 dark:bg-gray-700"
        />
      </div>
    </div>
  );
}
