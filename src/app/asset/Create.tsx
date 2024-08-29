import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import Select from '@/components/Select';
import { AssetConstant } from '@/constant';
import { FAsset, FSettingOptions } from '@/types';
import { AssetValidator } from '@/validator';

interface Props {
  className?: string;
  onSubmit: (data: FAsset) => void;
  settingOptions: FSettingOptions;
}

export default function Create(props: Props) {
  const { className = '', onSubmit } = props;

  const { register, handleSubmit, formState, reset, control } = useForm<FAsset>({
    defaultValues: AssetConstant.F_ASSET_INITIAL_VALUES,
    mode: 'all',
    resolver: zodResolver(AssetValidator.FAssetValidator),
  });

  const test = () => {
    console.log('formState.errors', formState.errors);
  };

  return (
    <div className={`border border-slate-600 rounded-sm p-2 flex flex-col gap-y-4 mt-4 ${className}`}>
      <div className="font-bold text-xl">Create Asset</div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
        <div className="flex gap-x-2">
          <Input register={register} path="name.nameEn" />
          <Input register={register} path="name.nameTw" />
          <Input register={register} path="name.nameJp" />
        </div>

        <div className="flex gap-2">
          <Select options={props.settingOptions.brands} register={register} path="brandId" />
          <Select options={props.settingOptions.categories} register={register} path="categoryId" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input type="date" register={register} path="startDate" />
          <Select options={props.settingOptions.currencies} register={register} path="startCurrencyId" />
          <Input type="number" register={register} path="startPrice" />

          <Select options={props.settingOptions.methods} register={register} path="startMethodId" />
          <Select options={props.settingOptions.places} register={register} path="startPlaceId" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input type="date" register={register} path="endDate" />
          <Select options={props.settingOptions.currencies} register={register} path="endCurrencyId" />
          <Input type="number" register={register} path="endPrice" />

          <Select options={props.settingOptions.methods} register={register} path="endMethodId" />
          <Select options={props.settingOptions.places} register={register} path="endPlaceId" />
        </div>

        <Input register={register} path="comment" />

        <button onClick={test} type="submit" className="bg-slate-400 hover:bg-slate-500 p-2 m-4 rounded-sm">
          Submit
        </button>
      </form>

      {/* <DevTool control={control} /> */}
    </div>
  );
}
