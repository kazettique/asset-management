import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { AssetConstant } from '@/constant';
import { FAsset, FSettingOptions } from '@/types';
import { AssetValidator } from '@/validator';

interface Props {
  className?: string;
  onClose: () => void;
  onSubmit: (data: FAsset) => void;
  settingOptions: FSettingOptions;
}

export default function Create(props: Props) {
  const { className = '', onSubmit, onClose } = props;

  const { register, handleSubmit, reset } = useForm<FAsset>({
    defaultValues: AssetConstant.F_ASSET_INITIAL_VALUES,
    resolver: zodResolver(AssetValidator.FAssetValidator),
  });

  return (
    <div className={`p-4 flex flex-col gap-y-4 bg-white overflow-auto dark:bg-gray-800 ${className}`}>
      <div className="flex justify-between">
        <div className="font-bold text-xl">Create Asset</div>
        <Icon
          onClick={onClose}
          iconType="x-lg"
          className="cursor-pointer hover:bg-slate-200 rounded-sm transition-all p-1"
        />
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="flex flex-col gap-y-4"
      >
        <div className="flex gap-x-2">
          <Input register={register} path="name" />
        </div>

        <div className="flex gap-2">
          <Select options={props.settingOptions.brands} register={register} path="brandId" />
          <Select options={props.settingOptions.categories} register={register} path="categoryId" />
          <Select options={props.settingOptions.owners} register={register} path="ownerId" />
          <Select options={props.settingOptions.places} register={register} path="placeId" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input type="date" register={register} path="startDate" />
          <Select options={props.settingOptions.currencies} register={register} path="startCurrencyId" />
          <Input type="number" register={register} path="startPrice" />

          <Select options={props.settingOptions.startMethods} register={register} path="startMethodId" />
          <Select options={props.settingOptions.platforms} register={register} path="startPlatformId" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input type="date" register={register} path="endDate" />
          <Select options={props.settingOptions.currencies} register={register} path="endCurrencyId" />
          <Input type="number" register={register} path="endPrice" />

          <Select options={props.settingOptions.endMethods} register={register} path="endMethodId" />
          <Select options={props.settingOptions.platforms} register={register} path="endPlatformId" />
        </div>

        <Input register={register} path="comment" />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
