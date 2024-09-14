import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import AvatarGroup from '@/components/AvatarGroup';
import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import BasicSelect from '@/components/BasicSelect';
import BasicTabGroup from '@/components/BasicTabGroup';
import ChipGroup from '@/components/ChipGroup';
import { AssetConstant } from '@/constant';
import {
  AssetLifeStatus,
  FAssetFindPrimaryFilter,
  FAssetFindSecondaryFilter,
  FormOption,
  FSettingOptions,
} from '@/types';
import { AssetValidator } from '@/validator';

export interface Props {
  className?: string;
  onSearch: (payload: FAssetFindPrimaryFilter) => void;
  settingOptions: FSettingOptions;
}

const LIFE_STATUS_OPTIONS: FormOption<AssetLifeStatus>[] = [
  { label: AssetLifeStatus.ALL.toLowerCase(), value: AssetLifeStatus.ALL },
  { label: AssetLifeStatus.LIVE.toLowerCase(), value: AssetLifeStatus.LIVE },
  { label: AssetLifeStatus.DEAD.toLowerCase(), value: AssetLifeStatus.DEAD },
];

export default function AssetSearchBar(props: Props) {
  const { className = '', settingOptions, onSearch } = props;
  // const [isSecondaryFilterOpen, setIsSecondaryFilterOpen] = useState<boolean>(false);

  const {
    register: primaryRegister,
    handleSubmit: primaryHandleSubmit,
    reset: primaryReset,
    control: primaryControl,
  } = useForm<FAssetFindPrimaryFilter>({
    defaultValues: AssetConstant.F_ASSET_FIND_PRIMARY_FILTER_INITIAL_VALUES,
    resolver: zodResolver(AssetValidator.FAssetFindPrimaryValidator),
  });

  const {
    register: secondaryRegister,
    handleSubmit: secondaryHandleSubmit,
    reset: secondaryReset,
    control: secondaryControl,
  } = useForm<FAssetFindSecondaryFilter>({
    defaultValues: AssetConstant.F_ASSET_FIND_SECONDARY_FILTER_INITIAL_VALUES,
    resolver: zodResolver(AssetValidator.FAssetFindSecondaryFilter),
  });

  const primaryValues = useWatch({ control: primaryControl });

  useEffect(() => {
    onSearch(primaryValues as FAssetFindPrimaryFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryValues]);

  return (
    <div className={`flex gap-x-2 overflow-x-auto items-center ${className}`} data-test-comp={AssetSearchBar.name}>
      <BasicTabGroup
        register={primaryRegister}
        path="lifeStatus"
        options={LIFE_STATUS_OPTIONS}
        control={primaryControl}
        className="shrink-0 sticky left-0"
      />

      <ChipGroup
        options={settingOptions.categories}
        register={primaryRegister}
        control={primaryControl}
        path="categories"
      />

      <div className="flex items-center shrink-0 sticky right-0 gap-x-2">
        <AvatarGroup
          options={settingOptions.owners}
          register={primaryRegister}
          control={primaryControl}
          path="owners"
        />

        <Popover className="relative">
          <PopoverButton>
            <BasicIcon
              iconType="filter-solid"
              className="shadow-md py-1 px-2 bg-white dark:bg-gray-500 text-gray-600 dark:text-white rounded-md cursor-pointer"
            />
          </PopoverButton>
          <PopoverPanel anchor="bottom end" className="bg-white p-4 rounded-md shadow-md">
            <form
              onSubmit={secondaryHandleSubmit((data) => {
                console.log('data', data);
              })}
              className="grid grid-cols-2 gap-4"
            >
              <BasicSelect isMulti path="brands" control={secondaryControl} options={settingOptions.brands} />

              <BasicSelect isMulti path="places" control={secondaryControl} options={settingOptions.places} />

              <BasicSelect
                isMulti
                path="startMethods"
                control={secondaryControl}
                options={settingOptions.startMethods}
              />
              <BasicSelect
                isMulti
                path="startPlatforms"
                control={secondaryControl}
                options={settingOptions.platforms}
              />
              <BasicInput register={secondaryRegister} path="startPriceRange.0" />
              <BasicInput register={secondaryRegister} path="startPriceRange.1" />
              <BasicInput register={secondaryRegister} path="startDateRange.0" />
              <BasicInput register={secondaryRegister} path="startDateRange.1" />

              <BasicSelect isMulti path="endMethods" control={secondaryControl} options={settingOptions.endMethods} />
              <BasicSelect isMulti path="endPlatforms" control={secondaryControl} options={settingOptions.platforms} />
              <BasicInput register={secondaryRegister} path="endPriceRange.0" />
              <BasicInput register={secondaryRegister} path="endPriceRange.1" />
              <BasicInput register={secondaryRegister} path="endDateRange.0" />
              <BasicInput register={secondaryRegister} path="endDateRange.1" />

              <BasicButton type="submit">submit</BasicButton>
            </form>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}
