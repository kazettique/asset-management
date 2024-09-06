import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import BasicFileReader from '@/components/BasicFileReader';
import BasicInputList from '@/components/BasicInputList';
import BasicSelect from '@/components/BasicSelect';
import Drawer from '@/components/Drawer';
import { AssetConstant } from '@/constant';
import { AssetFetcher } from '@/fetcher';
import { AssetTransformer } from '@/transformer';
import { FAssetImport, FSettingOptions } from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

export interface Props {
  children?: ReactElement;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  settingOptions: FSettingOptions;
}

export default function AssetImport(props: Props) {
  const { children, className = '', isOpen, onClose } = props;

  const { register, handleSubmit, reset, control } = useForm<FAssetImport>({
    defaultValues: AssetConstant.F_ASSET_IMPORT_INITIAL_VALUES,
    resolver: zodResolver(AssetValidator.FAssetImportValidator),
  });

  const handleImport = async (event: any) => {
    // const parsedData = Utils.DeepParseJson(event) as any[];
    // const csvValidation = AssetValidator.VAssetImportItemValidator.array().safeParse(parsedData);
    // if (!csvValidation.success) {
    //   alert('illegal csv format!');
    // } else {
    //   const payloadData = parsedData.map((item) => AssetTransformer.VAssetImportTransformer(item));
    //   await AssetFetcher.CreateMany(payloadData);
    //   // assetRefetch();
    // }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="import assets">
      <div {...props} className={`flex flex-col gap-y-4 px-4 ${className}`} data-test-comp={AssetImport.name}>
        <BasicFileReader onChange={handleImport} label="import" />

        <div>
          <div className="flex gap-x-2">
            <BasicSelect options={props.settingOptions.brands} path="brandId" control={control} />
            <BasicSelect options={props.settingOptions.brands} path="categoryId" control={control} />
            <BasicSelect options={props.settingOptions.brands} path="ownerId" control={control} />
            <BasicSelect options={props.settingOptions.brands} path="placeId" control={control} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <BasicSelect options={props.settingOptions.brands} path="startCurrencyId" control={control} />
            <BasicSelect options={props.settingOptions.brands} path="startPlatformId" control={control} />
            <BasicSelect options={props.settingOptions.brands} path="startMethodId" control={control} />
            <BasicSelect options={props.settingOptions.brands} path="endCurrencyId" control={control} />
            <BasicSelect options={props.settingOptions.brands} path="endPlatformId" control={control} />
            <BasicSelect options={props.settingOptions.brands} path="endMethodId" control={control} />
          </div>

          <BasicSelect options={props.settingOptions.tags} isCreatable isMulti path="tags" control={control} />
          <BasicInputList
            control={control}
            path="meta"
            register={register}
            newItemDefaultValue={{ key: '', value: '' }}
          />
        </div>
      </div>
    </Drawer>
  );
}
