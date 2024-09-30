'use client';

import BasicButton from '@/components/BasicButton';
import { SettingFetcher } from '@/fetcher';

export default function Page() {
  const test = async () => {
    await SettingFetcher.FindAll();
  };

  return (
    <div className="relative h-full bg-slate-50 dark:bg-slate-800 dark:text-slate-50">
      <h1>Hello, Test Page!</h1>
      <BasicButton onClick={() => test()}>click</BasicButton>
    </div>
  );
}
