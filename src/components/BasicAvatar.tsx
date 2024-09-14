import { ReactElement, useMemo } from 'react';

export interface Props {
  className?: string;
  name: string;
}

export default function BasicAvatar(props: Props) {
  const { className = '', name } = props;

  const capital = name.substring(0, 1);

  const color = useMemo<string>(() => {
    const random = Math.floor(Math.random() * 17);

    switch (random) {
      case 0:
        return 'bg-red-500 dark:bg-red-100';
      case 1:
        return 'bg-orange-500 dark:bg-orange-100';
      case 2:
        return 'bg-amber-500 dark:bg-amber-100';
      case 3:
        return 'bg-yellow-500 dark:bg-yellow-100';
      case 4:
        return 'bg-lime-500 dark:bg-lime-100';
      case 5:
        return 'bg-green-500 dark:bg-green-100';
      case 6:
        return 'bg-emerald-500 dark:bg-emerald-100';
      case 7:
        return 'bg-teal-500 dark:bg-teal-100';
      case 8:
        return 'bg-cyan-500 dark:bg-cyan-100';
      case 9:
        return 'bg-sky-500 dark:bg-sky-100';
      case 10:
        return 'bg-blue-500 dark:bg-blue-100';
      case 11:
        return 'bg-indigo-500 dark:bg-indigo-100';
      case 12:
        return 'bg-violet-500 dark:bg-violet-100';
      case 13:
        return 'bg-purple-500 dark:bg-purple-100';
      case 14:
        return 'bg-fuchsia-500 dark:bg-fuchsia-100';
      case 15:
        return 'bg-pink-500 dark:bg-pink-100';
      case 16:
        return 'bg-rose-500 dark:bg-rose-100';
      default:
        return 'bg-slate-500 dark:bg-slate-100';
    }
  }, []);

  return (
    <div
      {...props}
      className={`flex items-center justify-center h-8 w-8 rounded-full shadow hover:z-10 focus:z-10 capitalize cursor-pointer hover:brightness-105 transition-all hover:scale-110 text-white ${color} ${className}`}
      data-test-comp={BasicAvatar.name}
      title={name}
    >
      {capital}
    </div>
  );
}
