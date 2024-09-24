'use client';

import { ofetch } from 'ofetch';

import BasicButton from '@/components/BasicButton';

export default function Page() {
  const test = async () => {
    await ofetch('/api/hello', {
      params: { id: 5566, name: 'john' },
      query: { age: 23, nickName: 'jon' },
    });
  };

  return (
    <div className="relative h-full bg-slate-50 dark:bg-slate-800 dark:text-slate-50">
      <h1>Hello, Test Page!</h1>
      <BasicButton onClick={() => test()}>click</BasicButton>
    </div>
  );
}
