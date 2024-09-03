import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import BasicSelect from '@/components/BasicSelect';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import BasicInput from '@/components/BasicInput';
import TextArea from '@/components/TextArea';
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

  const { register, handleSubmit, reset, control } = useForm<FAsset>({
    defaultValues: AssetConstant.F_ASSET_INITIAL_VALUES,
    resolver: zodResolver(AssetValidator.FAssetValidator),
  });

  return (
    <div className={`p-4 flex flex-col gap-y-4 bg-gray-50 overflow-auto dark:bg-gray-800 ${className}`}>
      <div className="flex justify-between">
        <div className="font-bold text-xl dark:text-gray-50">Create Asset</div>
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
      >
        <div className="flex gap-4">
          <div className="flex flex-col gap-x-2 bg-white dark:bg-gray-900 rounded-md shadow-md p-4 w-1/2">
            <div className="text-slate-700 dark:text-slate-100 text-xl capitalize">basic info</div>
            <BasicInput register={register} path="name" />
            <BasicSelect options={props.settingOptions.brands} path="brandId" control={control} />
            <BasicSelect options={props.settingOptions.categories} path="categoryId" control={control} />
            <BasicSelect options={props.settingOptions.owners} path="ownerId" control={control} isCreatable />
            <BasicSelect options={props.settingOptions.places} path="placeId" control={control} />
            <BasicSelect options={props.settingOptions.tags} isCreatable isMulti path="tags" control={control} />
            {/* <div className="dark:text-white">{JSON.stringify(values)}</div> */}

            <TextArea register={register} path="comment" rows={5} />
          </div>

          <div className="w-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-x-2 bg-white dark:bg-gray-900 rounded-md shadow-md p-4">
              <div className="text-slate-700 dark:text-slate-100 text-xl capitalize">start info</div>
              <div className="grid grid-cols-2 gap-2">
                <BasicInput type="date" register={register} path="startDate" />
                <BasicSelect options={props.settingOptions.currencies} path="startCurrencyId" control={control} />
                <BasicInput type="number" register={register} path="startPrice" />

                <BasicSelect options={props.settingOptions.startMethods} path="startMethodId" control={control} />
                <BasicSelect options={props.settingOptions.platforms} path="startPlatformId" control={control} />
              </div>
            </div>

            <div className="flex flex-col gap-x-2 bg-white dark:bg-gray-900 rounded-md shadow-md p-4">
              <div className="text-slate-700 dark:text-slate-100 text-xl capitalize">end info</div>
              <div className="grid grid-cols-2 gap-2">
                <BasicInput type="date" register={register} path="endDate" />
                <BasicSelect options={props.settingOptions.currencies} path="endCurrencyId" control={control} />
                <BasicInput type="number" register={register} path="endPrice" />

                <BasicSelect options={props.settingOptions.endMethods} path="endMethodId" control={control} />
                <BasicSelect options={props.settingOptions.platforms} path="endPlatformId" control={control} />
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-fit mt-4 block ml-auto mr-0">
          Submit
        </Button>
      </form>
    </div>
  );
}
