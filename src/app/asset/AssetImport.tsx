'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicFileReader from '@/components/BasicFileReader';
import BasicInputList from '@/components/BasicInputList';
import BasicSelect from '@/components/BasicSelect';
import Drawer from '@/components/Drawer';
import Table, { ColumnProps } from '@/components/Table';
import { AssetConstant } from '@/constant';
import { MachineContext } from '@/machines/asset';
import { AssetTransformer } from '@/transformer';
import { FAssetImport, FSettingOptions, PAsset, VAssetImportItem, VAssetImportTable } from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

export interface Props {
  children?: ReactElement;
  className?: string;
  importContext: MachineContext['import'];
  isOpen: boolean;
  onClose: () => void;
  onDone: () => void;
  onImport: (payload: PAsset[]) => void;
  settingOptions: FSettingOptions;
  state: 'PREPARE' | 'PROCESSING' | 'FINISH';
}

export default function AssetImport(props: Props) {
  const { children, className = '', isOpen, onClose, onDone, settingOptions, onImport, state, importContext } = props;
  const [importItems, setImportItems] = useState<VAssetImportItem[]>([]);

  const { register, handleSubmit, reset, control, setValue, formState } = useForm<FAssetImport>({
    defaultValues: AssetConstant.F_ASSET_IMPORT_INITIAL_VALUES,
    mode: 'all',
    resolver: zodResolver(AssetValidator.FAssetImportValidator),
  });

  const isLegalFileData = useWatch({ control, name: 'isLegalFileData' });

  const handleFileData = async (event: any) => {
    const parsedData = Utils.DeepParseJson(event) as any[];
    const csvValidation = AssetValidator.VAssetImportItemValidator.array().safeParse(parsedData);

    if (!csvValidation.success) {
      setValue('isLegalFileData', false);
    } else {
      setValue('isLegalFileData', true);
      setImportItems(csvValidation.data);
    }
  };

  const tableData: VAssetImportTable[] = Object.values(importContext.tasks).map((item, index) => ({
    name: item.name,
    no: index + 1,
    status: item.status,
  }));

  const columns: ColumnProps<VAssetImportTable>[] = [
    { key: 'no', title: '#' },
    { key: 'name', title: 'Name' },
    {
      key: 'status',
      render: (column, item) => (
        <div
          data-status={item.status}
          className='data-[status="DONE"]:text-green-500 data-[status="FAILED"]:text-red-500 data-[status="PROCESSING"]:text-blue-500'
        >
          {item.status}
        </div>
      ),
      title: 'Status',
    },
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} disableClose={state === 'PROCESSING'} title="import assets">
      <div data-test-comp={AssetImport.name} className={`p-4 ${className}`}>
        {state === 'PREPARE' ? (
          <form
            {...props}
            className="flex flex-col gap-y-4"
            onSubmit={handleSubmit((data) => {
              onImport(importItems.map((importItem) => AssetTransformer.VAssetImportTransformer(importItem, data)));
            })}
          >
            <div>
              <BasicFileReader onChange={handleFileData} label="import" />
              {isLegalFileData !== null && (
                <div className="text-sm text-gray-700 font-semibold">
                  <span>File checker: file data is&nbsp;</span>
                  <span
                    data-is-legal={isLegalFileData}
                    className="data-[is-legal='true']:text-green-500 data-[is-legal='false']:text-red-500"
                  >
                    {isLegalFileData ? 'legal' : 'illegal'}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="flex gap-x-2">
                <BasicSelect options={settingOptions.brands} path="brandId" control={control} />
                <BasicSelect options={settingOptions.categories} path="categoryId" control={control} />
                <BasicSelect options={settingOptions.owners} path="ownerId" control={control} />
                <BasicSelect options={settingOptions.places} path="placeId" control={control} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <BasicSelect options={settingOptions.currencies} path="startCurrencyId" control={control} />
                <BasicSelect options={settingOptions.platforms} path="startPlatformId" control={control} />
                <BasicSelect options={settingOptions.startMethods} path="startMethodId" control={control} />
                <BasicSelect options={settingOptions.currencies} path="endCurrencyId" control={control} />
                <BasicSelect options={settingOptions.platforms} path="endPlatformId" control={control} />
                <BasicSelect options={settingOptions.endMethods} path="endMethodId" control={control} />
              </div>

              <BasicSelect options={settingOptions.tags} isCreatable isMulti path="tags" control={control} />
              <BasicInputList
                control={control}
                path="meta"
                register={register}
                newItemDefaultValue={{ key: '', value: '' }}
              />
            </div>

            <BasicButton type="submit">Import</BasicButton>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <Table data={tableData} columns={columns} />
            {state === 'FINISH' && <BasicButton onClick={onDone}>Done</BasicButton>}
          </div>
        )}
      </div>
    </Drawer>
  );
}
