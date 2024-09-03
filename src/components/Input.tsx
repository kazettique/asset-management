import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues>
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label?: string;
  path: Path<T>;
  register: UseFormRegister<T>;
}

export default function Input<T extends FieldValues>(props: Props<T>) {
  const { label = '', path, register, className = '', placeholder = 'Please type something', ...rest } = props;

  const registerOptions =
    props.type === 'date' ? { valueAsDate: true } : props.type === 'number' ? { valueAsNumber: true } : {};

  return (
    <div className={`flex gap-x-2 flex-col ${className}`}>
      <label className="block dark:text-gray-50 text-gray-700" htmlFor={path}>
        {label || path}
      </label>
      <input
        {...register(path, registerOptions)}
        {...rest}
        placeholder={placeholder}
        className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50 ${className}`}
      />
    </div>
  );
}
