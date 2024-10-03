'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import BasicButton from '@/components/BasicButton';
import BasicDrawer from '@/components/BasicDrawer';
import BasicFileReader from '@/components/BasicFileReader';
import BasicIcon from '@/components/BasicIcon';
import BasicInputList from '@/components/BasicInputList';
import BasicSelect from '@/components/BasicSelect';
import BasicTextArea from '@/components/BasicTextArea';
import Table, { ColumnProps } from '@/components/Table';
import { AssetConstant } from '@/constant';
import { AssetMachineContext } from '@/machines/asset';
import { AssetTransformer } from '@/transformer';
import {
  FAssetImport,
  FormOption,
  FSettingOptions,
  IconType,
  ImportTable,
  ImportTaskStatus,
  PAsset,
  VAssetImportItem,
} from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

export interface Props {
  className?: string;
  currencyOptions: FormOption[];
  importContext: AssetMachineContext['import'];
  isOpen: boolean;
  onClose: () => void;
  onDone: () => void;
  onImport: (payload: PAsset[]) => void;
  settingOptions: FSettingOptions;
  state: 'PREPARE' | 'PROCESSING' | 'FINISH';
}

export default function AssetImport(props: Props) {
  const {
    className = '',
    isOpen,
    onClose,
    onDone,
    settingOptions,
    currencyOptions,
    onImport,
    state,
    importContext,
  } = props;
  const [importItems, setImportItems] = useState<VAssetImportItem[]>([]);

  const { register, handleSubmit, control, setValue } = useForm<FAssetImport>({
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

  const tableData: ImportTable[] = Object.values(importContext.tasks).map((item) => ({
    name: item.name,
    status: item.status,
  }));

  const columns: ColumnProps<ImportTable>[] = [
    { key: 'name', title: 'Name' },
    {
      key: 'status',
      render: (column, item) => {
        let statusIcon: IconType;
        switch (item.status) {
          case ImportTaskStatus.FAILED:
            statusIcon = 'circle-xmark-solid';
            break;
          case ImportTaskStatus.PROCESSING:
            statusIcon = 'spinner-solid';
            break;
          case ImportTaskStatus.QUEUE:
            statusIcon = 'circle-pause-solid';
            break;
          case ImportTaskStatus.DONE:
          default:
            statusIcon = 'circle-check-solid';
        }

        return (
          <div
            data-status={item.status}
            className='data-[status="DONE"]:text-green-500 data-[status="FAILED"]:text-red-500 data-[status="PROCESSING"]:text-blue-500 data-[status="PROCESSING"]:animate-spin w-fit h-fit'
          >
            <BasicIcon iconType={statusIcon} />
          </div>
        );
      },
      title: 'Status',
    },
  ];

  return (
    <BasicDrawer isOpen={isOpen} onClose={onClose} disableClose={state === 'PROCESSING'} title="import assets">
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

            <div className="gap-4 flex flex-col">
              <div className="flex gap-4">
                <BasicSelect options={settingOptions.brands} path="brandId" control={control} />
                <BasicSelect options={settingOptions.categories} path="categoryId" control={control} />
                <BasicSelect options={settingOptions.owners} path="ownerId" control={control} />
                <BasicSelect options={settingOptions.places} path="placeId" control={control} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <BasicSelect options={currencyOptions} path="startCurrency" control={control} />
                <BasicSelect options={settingOptions.platforms} path="startPlatformId" control={control} />
                <BasicSelect options={settingOptions.startMethods} path="startMethodId" control={control} />
                <BasicSelect options={currencyOptions} path="endCurrency" control={control} />
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

              <BasicTextArea register={register} path="comment" />
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
    </BasicDrawer>
  );
}
