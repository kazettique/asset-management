import { DetailedHTMLProps, OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface Props<T extends FieldValues>
  extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  className?: string;
  label?: string;
  options: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>[];
  path: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
}

export default function Select<T extends FieldValues>(props: Props<T>) {
  const { label = '', path, register, className = '', options, placeholder = '請選擇', ...rest } = props;

  return (
    <div className="flex gap-x-2 flex-col">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" htmlFor={path}>
        {label || path}
      </label>
      <select
        {...register(path)}
        defaultValue="null"
        {...rest}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-4 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      >
        <option value="" label={placeholder} disabled />
        {options.map((option, index) => (
          <option key={index} {...option} />
        ))}
      </select>
    </div>
  );
}
