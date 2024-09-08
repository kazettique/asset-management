import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import BasicInput from '@/components/BasicInput';
import BasicInputList from '@/components/BasicInputList';
import BasicSelect from '@/components/BasicSelect';
import BasicTextArea from '@/components/BasicTextArea';
import Drawer from '@/components/Drawer';
import { AssetConstant } from '@/constant';
import { FAsset, FSettingOptions, Id, NType } from '@/types';
import { AssetValidator } from '@/validator';

interface Props {
  className?: string;
  defaultValues: NType<FAsset>;
  id: NType<Id>;
  isOpen: boolean;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onCreate: (data: FAsset) => void;
  onDelete: (id: Id) => void;
  onUpdate: (data: FAsset, id: Id) => void;
  settingOptions: FSettingOptions;
}

export default function AssetModifier(props: Props) {
  const { className = '', defaultValues, id, isOpen, mode, onClose, onCreate, onDelete, onUpdate } = props;

  const _defaultValues = useMemo(() => {
    return defaultValues || AssetConstant.F_ASSET_INITIAL_VALUES;
  }, [defaultValues]);

  const { register, handleSubmit, reset, control } = useForm<FAsset>({
    defaultValues: _defaultValues,
    resolver: zodResolver(AssetValidator.FAssetValidator),
  });

  // ref: https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
  useEffect(() => {
    reset(_defaultValues);
  }, [_defaultValues, reset]);

  const title = useMemo<string>(() => (mode ? `${mode} asset` : ''), [mode]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title}>
      <div className={`p-4 flex flex-col gap-y-4 bg-gray-50 dark:bg-gray-800 w-[500px] ${className}`}>
        <form
          onSubmit={handleSubmit((data) => {
            if (mode === 'create') onCreate(data);
            if (mode === 'edit' && id) onUpdate(data, id);
            reset();
            onClose();
          })}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 bg-white dark:bg-gray-900 rounded-md shadow-md p-4">
              <div className="text-slate-700 dark:text-slate-100 text-xl capitalize">basic info</div>
              <BasicInput register={register} path="name" />
              <div className="flex gap-2">
                <BasicSelect className="grow" options={props.settingOptions.brands} path="brandId" control={control} />
                <BasicSelect
                  className="grow"
                  options={props.settingOptions.categories}
                  path="categoryId"
                  control={control}
                />
              </div>
              <div className="flex gap-2">
                <BasicSelect
                  className="grow"
                  options={props.settingOptions.owners}
                  path="ownerId"
                  control={control}
                  isCreatable
                />
                <BasicSelect className="grow" options={props.settingOptions.places} path="placeId" control={control} />
              </div>
              <BasicSelect options={props.settingOptions.tags} isCreatable isMulti path="tags" control={control} />
              <BasicInputList
                control={control}
                path="meta"
                register={register}
                newItemDefaultValue={{ key: '', value: '' }}
              />

              <BasicTextArea register={register} path="comment" rows={5} />
            </div>

            <div className="flex flex-col gap-x-2 bg-white dark:bg-gray-900 rounded-md shadow-md p-4">
              <div className="text-slate-700 dark:text-slate-100 text-xl capitalize">start info</div>
              <div className="grid grid-cols-2 gap-2">
                <BasicInput type="date" register={register} path="startDate" />

                <div className="flex gap-2">
                  <BasicSelect options={props.settingOptions.currencies} path="startCurrencyId" control={control} />
                  <BasicInput type="number" register={register} path="startPrice" />
                </div>

                <BasicSelect options={props.settingOptions.startMethods} path="startMethodId" control={control} />
                <BasicSelect options={props.settingOptions.platforms} path="startPlatformId" control={control} />
              </div>
            </div>

            <div className="flex flex-col gap-x-2 bg-white dark:bg-gray-900 rounded-md shadow-md p-4">
              <div className="text-slate-700 dark:text-slate-100 text-xl capitalize">end info</div>
              <div className="grid grid-cols-2 gap-2">
                <BasicInput type="date" register={register} path="endDate" />

                <div className="flex gap-2">
                  <BasicSelect options={props.settingOptions.currencies} path="endCurrencyId" control={control} />
                  <BasicInput type="number" register={register} path="endPrice" />
                </div>

                <BasicSelect options={props.settingOptions.endMethods} path="endMethodId" control={control} />
                <BasicSelect options={props.settingOptions.platforms} path="endPlatformId" control={control} />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 w-fit ml-auto mr-0">
            {mode && (
              <BasicButton type="submit" className="grow">
                {mode === 'create' ? 'create' : 'update'}
              </BasicButton>
            )}
            {mode === 'edit' && (
              <BasicButton
                variant="danger"
                onClick={() => {
                  if (id) onDelete(id);
                }}
              >
                <BasicIcon iconType="x-lg" />
              </BasicButton>
            )}
          </div>
        </form>
      </div>
    </Drawer>
  );
}
