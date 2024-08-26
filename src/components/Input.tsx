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
  const { label = '', path, required, register, className = '' } = props;

  return (
    <div className="flex gap-x-2 flex-col">
      {label && (
        <label className="block" htmlFor={path}>
          {label}
        </label>
      )}
      <input {...register(path, { required })} name={path} className={`block bg-slate-300 p-1 ${className}`} />
    </div>
  );
}
