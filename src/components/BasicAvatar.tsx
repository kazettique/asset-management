import { useMemo } from 'react';
import { FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';

import { FormOption } from '@/types';

export interface Props<Values extends FieldValues, Option extends FormOption> {
  className?: string;
  isActive?: boolean;
  option: Option;
  registerReturn: UseFormRegisterReturn<Path<Values>>;
}

export default function BasicAvatar<Values extends FieldValues, Option extends FormOption>(
  props: Props<Values, Option>,
) {
  const { className, isActive, option, registerReturn } = props;

  const capital = option.label.substring(0, 1);

  const color = useMemo<string>(() => {
    const random = Math.floor(Math.random() * 17);

    switch (random) {
      case 0:
        return 'bg-red-500 dark:bg-red-800';
      case 1:
        return 'bg-orange-500 dark:bg-orange-800';
      case 2:
        return 'bg-amber-500 dark:bg-amber-800';
      case 3:
        return 'bg-yellow-500 dark:bg-yellow-800';
      case 4:
        return 'bg-lime-500 dark:bg-lime-800';
      case 5:
        return 'bg-green-500 dark:bg-green-800';
      case 6:
        return 'bg-emerald-500 dark:bg-emerald-800';
      case 7:
        return 'bg-teal-500 dark:bg-teal-800';
      case 8:
        return 'bg-cyan-500 dark:bg-cyan-800';
      case 9:
        return 'bg-sky-500 dark:bg-sky-800';
      case 10:
        return 'bg-blue-500 dark:bg-blue-800';
      case 11:
        return 'bg-indigo-500 dark:bg-indigo-800';
      case 12:
        return 'bg-violet-500 dark:bg-violet-800';
      case 13:
        return 'bg-purple-500 dark:bg-purple-800';
      case 14:
        return 'bg-fuchsia-500 dark:bg-fuchsia-800';
      case 15:
        return 'bg-pink-500 dark:bg-pink-800';
      case 16:
        return 'bg-rose-500 dark:bg-rose-800';
      default:
        return 'bg-slate-500 dark:bg-slate-800';
    }
  }, []);

  return (
    <label
      data-is-active={isActive}
      className={`flex items-center justify-center h-8 w-8 rounded-full shadow hover:z-10 focus:z-10 capitalize cursor-pointer hover:brightness-105 transition-all hover:scale-110 data-[is-active="true"]:-translate-y-2 text-white border-2 border-white ${color}`}
    >
      {capital}
      <input {...registerReturn} type="checkbox" className="hidden" value={option.value} />
    </label>
  );
}
