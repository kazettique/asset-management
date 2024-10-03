import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import BasicToggleSwitch from './BasicToggleSwitch';

interface Props<T extends FieldValues>
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label?: string;
  path: Path<T>;
  register: UseFormRegister<T>;
}

// ref: https://www.cssscript.com/realistic-ios-switch-pure-css/
export default function FormToggleSwitch<T extends FieldValues>(props: Props<T>) {
  const { className = '', label = '', path, register, disabled } = props;

  return (
    <label className={`toggleSwitch ${className}`} data-test-comp={BasicToggleSwitch.name}>
      <label className="block dark:text-gray-50 text-gray-700" htmlFor={path}>
        {label || path}
      </label>
      <input type="checkbox" {...register(path)} disabled={disabled} />
      <i />
    </label>
  );
}
