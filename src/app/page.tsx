'use client';

import { useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';

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
  const { control, register, watch, handleSubmit } = useForm<MyForm>({
    defaultValues,
    mode: 'all',
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'test', // unique name for your Field Array
  });

  const values = useWatch<MyForm>({ control, name: 'test' });

  const onSubmit = (data: MyForm) => {
    console.log('data', data);
  };

  const onChange = (event: boolean): void => {
    console.log('event', event);
    setIsChecked(event);
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <main>
      <h1 className="text-4xl font-bold text-center py-4">Home page</h1>
      <form className="flex flex-col gap-y-4 w-2/3 p-10" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div className="flex gap-x-2" key={field.id}>
            <input className="block" placeholder="please type name" {...register(`test.${index}.name` as const)} />
            <input className="block" placeholder="please type price" {...register(`test.${index}.price` as const)} />
          </div>
        ))}
        <Button
          onClick={() =>
            append({
              name: '',
              price: 0,
            })
          }
          variant="secondary"
        >
          Add
        </Button>
        <hr />
        <Button type="submit">Submit</Button>

        <div className="bg-slate-100">{JSON.stringify(values, null, 2)}</div>
      </form>

      <ToggleSwitch onChange={onChange} isChecked={isChecked} />
      <ToggleSwitch onChange={onChange} label="hello" isChecked={isChecked} />
    </main>
  );
}
