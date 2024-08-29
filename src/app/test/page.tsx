'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { personData1, personData2 } from '@/testData';
import { FPerson, MPerson, VPerson } from '@/testModel';
import { PersonTransformer } from '@/testTransformer';
import { FPersonValidator } from '@/testValidator';

const rawPerson: MPerson = personData2;
const vPerson: VPerson = PersonTransformer.MPersonTransformer(rawPerson);
const fPerson: FPerson = PersonTransformer.VPersonTransformer(vPerson);

export default function Page() {
  const { handleSubmit, register } = useForm<FPerson>({
    defaultValues: fPerson,
    resolver: zodResolver(FPersonValidator),
  });

  const onSubmit = (data: FPerson) => {
    console.log('data', data);

    const transformedData = PersonTransformer.FPersonTransformer(data);
    console.log('transformedData', transformedData);
  };

  return (
    <>
      <h1>Hello, Test Page!</h1>
      {/* react hook form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-10">
        <Input register={register} path="name" />
        <Input register={register} path="age" type="number" />
        <Input register={register} path="companyId" />

        <Button type="submit" className="p-1 my-2 bg-slate-400">
          Submit
        </Button>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
}
