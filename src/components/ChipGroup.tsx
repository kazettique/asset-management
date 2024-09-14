import { Control, FieldValues, Path, UseFormRegister, useWatch } from 'react-hook-form';

import { FormOption } from '@/types';

import BasicChip from './BasicChip';

interface Props<Values extends FieldValues, Option extends FormOption> {
  className?: string;
  control: Control<Values>;
  label?: string;
  options: Option[];
  path: Path<Values>;
  register: UseFormRegister<Values>;
  showLabel?: boolean;
}

export default function ChipGroup<Values extends FieldValues, Option extends FormOption>(props: Props<Values, Option>) {
  const { className = '', options, register, path, control } = props;

  const values = useWatch({ control, name: path });

  return (
    <div className={`flex items-center space-x-1 ${className}`} data-test-comp={ChipGroup.name}>
      {options.map((option, index) => (
        <BasicChip
          key={index}
          option={option}
          registerReturn={register(path)}
          isActive={values.includes(option.value)}
        />
      ))}
    </div>
  );
}
