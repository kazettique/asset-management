import { DetailedHTMLProps, OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues>
  extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  className?: string;
  label?: string;
  options: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>[];
  path: Path<T>;
  register: UseFormRegister<T>;
}

export default function Select<T extends FieldValues>(props: Props<T>) {
  const { label = '', path, required, register, className = '', options } = props;

  return (
    <div className="flex gap-x-2 flex-col">
      {label && (
        <label className="block" htmlFor={path}>
          {label}
        </label>
      )}
      <select {...register(path, { required })} className={`block bg-slate-300 p-1 ${className}`}>
        {options.map((option, index) => (
          <option key={index} {...option} />
        ))}
      </select>
    </div>
  );
}
