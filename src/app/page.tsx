'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProps, useForm } from 'react-hook-form';
import { z } from 'zod';

import BasicSelect from '@/components/BasicSelect';
import Button from '@/components/Button';
import FileReader from '@/components/FileReader';
import { FormOption } from '@/types';

interface MyForm {
  test: {
    name: string;
    price: number;
  }[];
  // test: string[];
}

const defaultValues: MyForm = {
  test: [],
};

export default function Home() {
  const { register, handleSubmit, reset, control, watch, formState } = useForm<{ name: string | null }>({
    defaultValues: { name: null },
    mode: 'all',
    resolver: zodResolver(z.object({ name: z.string().nullable() })),
  });

  const options: FormOption[] = [
    {
      label: 'aaa',
      value: 1,
    },
    { label: 'bbb', value: 2 },
  ];

  useEffect(() => {
    const errors = formState.errors;
    const values = watch();
    console.log('error', errors);
    console.log('values', values);
  }, [formState.errors, watch]);

  return (
    <main>
      <h1 className="text-4xl font-bold text-center py-4">Home page</h1>

      <FileReader />
      {/* <MultiSelect /> */}

      <form
        onSubmit={handleSubmit((data) => {
          console.log('data', data);
          // onSubmit(data);
          // reset();
        })}
      >
        <BasicSelect control={control} path="name" options={options} />
        <Button type="submit" className="w-fit mt-4 block ml-auto mr-0">
          Submit
        </Button>
      </form>
    </main>
  );
}
