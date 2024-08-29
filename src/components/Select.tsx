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
      <label className="block" htmlFor={path}>
        {label || path}
      </label>
      <select {...register(path)} defaultValue="null" {...rest} className={`block bg-slate-300 p-1 ${className}`}>
        <option value="" label={placeholder} disabled />
        {options.map((option, index) => (
          <option key={index} {...option} />
        ))}
      </select>
    </div>
  );
}
