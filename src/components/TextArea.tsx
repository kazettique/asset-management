import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues>
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  className?: string;
  label?: string;
  path: Path<T>;
  register: UseFormRegister<T>;
}

export default function TextArea<T extends FieldValues>(props: Props<T>) {
  const { label = '', path, register, className = '', placeholder = 'Please type something', ...rest } = props;

  return (
    <div className="flex gap-x-2 flex-col" data-test-comp={TextArea.name}>
      <label className="block dark:text-gray-50 text-gray-700" htmlFor={path}>
        {label || path}
      </label>
      <textarea
        {...register(path)}
        {...rest}
        placeholder={placeholder}
        className={`border mt-1 rounded w-full p-4 bg-gray-50 dark:border-gray-500 dark:bg-gray-700 dark:text-white ${className}`}
      />
    </div>
  );
}
