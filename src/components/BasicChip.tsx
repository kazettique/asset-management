import { FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';

import { FormOption } from '@/types';

export interface Props<Values extends FieldValues, Option extends FormOption> {
  className?: string;
  isActive?: boolean;
  option: Option;
  registerReturn: UseFormRegisterReturn<Path<Values>>;
  size?: 'sm' | 'md' | 'lg';
}

export default function BasicAvatar<Values extends FieldValues, Option extends FormOption>(
  props: Props<Values, Option>,
) {
  const { className, isActive, option, registerReturn, size = 'sm' } = props;

  return (
    <label
      data-is-active={isActive}
      data-size={size}
      className="block select-none whitespace-nowrap rounded-full align-baseline leading-none transition-all text-blue-600 hover:bg-blue-200 bg-blue-100 data-[is-active='true']:bg-blue-500 data-[is-active='true']:text-white dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-blue-400 cursor-pointer h-fit data-[size='sm']:px-3 data-[size='sm']:py-1 data-[size='sm']:text-xs data-[size='md']:px-3 data-[size='md']:py-1.5 data-[size='md']:text-base data-[size='lg']:px-4 data-[size='lg']:py-2 data-[size='lg']:text-lg"
      data-test-comp={BasicAvatar.name}
    >
      {option.label}
      <input {...registerReturn} type="checkbox" className="hidden" value={option.value} />
    </label>
  );
}
