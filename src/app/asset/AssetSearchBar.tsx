import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement, useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import BasicAvatar from '@/components/BasicAvatar';
import BasicButton from '@/components/BasicButton';
import BasicInput from '@/components/BasicInput';
import BasicSelect from '@/components/BasicSelect';
import BasicTabGroup from '@/components/BasicTabGroup';
import { AssetConstant } from '@/constant';
import { AssetTransformer } from '@/transformer';
import { AssetLifeStatus, FAssetFindPrimaryFilter, FormOption, FSettingOptions, PAssetFind } from '@/types';
import { AssetValidator } from '@/validator';

export interface Props {
  className?: string;
  onSearch: (payload: FAssetFindPrimaryFilter) => void;
  settingOptions: FSettingOptions;
}

export default function AssetSearchBar(props: Props) {
  const { className = '', settingOptions, onSearch } = props;

  const { register, handleSubmit, reset, control } = useForm<FAssetFindPrimaryFilter>({
    defaultValues: AssetConstant.F_ASSET_FIND_PRIMARY_FILTER_INITIAL_VALUES,
    resolver: zodResolver(AssetValidator.FAssetFindPrimaryValidator),
  });

  const options: FormOption<AssetLifeStatus>[] = [
    { label: AssetLifeStatus.ALL, value: AssetLifeStatus.ALL },
    { label: AssetLifeStatus.LIVE, value: AssetLifeStatus.LIVE },
    { label: AssetLifeStatus.DEAD, value: AssetLifeStatus.DEAD },
  ];

  const values = useWatch({ control });

  useEffect(() => {
    onSearch(values as FAssetFindPrimaryFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div {...props} className={`flex items-center gap-x-4 ${className}`} data-test-comp={AssetSearchBar.name}>
      <BasicTabGroup register={register} path="lifeStatus" options={options} control={control} />
      <BasicSelect showLabel={false} isMulti path="categories" control={control} options={settingOptions.categories} />
      <BasicSelect showLabel={false} isMulti path="owners" control={control} options={settingOptions.owners} />

      {/* <BasicSelect isMulti path="filters.brands" control={control} options={settingOptions.brands} />

      <BasicSelect isMulti path="filters.places" control={control} options={settingOptions.places} />

      <BasicSelect isMulti path="filters.startMethods" control={control} options={settingOptions.startMethods} />
      <BasicSelect isMulti path="filters.startPlatforms" control={control} options={settingOptions.platforms} />
      <BasicInput register={register} path='filters.startPriceRange.0' />
      <BasicInput register={register} path='filters.startPriceRange.1' />
      <BasicInput register={register} path='filters.startDateRange.0' />
      <BasicInput register={register} path='filters.startDateRange.1' />

      <BasicSelect isMulti path="filters.endMethods" control={control} options={settingOptions.endMethods} />
      <BasicSelect isMulti path="filters.endPlatforms" control={control} options={settingOptions.platforms} />
      <BasicInput register={register} path='filters.endPriceRange.0' />
      <BasicInput register={register} path='filters.endPriceRange.1' />
      <BasicInput register={register} path='filters.endDateRange.0' />
      <BasicInput register={register} path='filters.endDateRange.1' /> */}
    </div>
  );
}
