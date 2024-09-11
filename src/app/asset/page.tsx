'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { useMemo, useState } from 'react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';
import SearchInput from '@/components/SearchInput';
import TabGroup from '@/components/TabGroup';
import Table, { ColumnProps } from '@/components/Table';
import { SettingConstant } from '@/constant';
import { AssetFetcher, SettingFetcher } from '@/fetcher';
import { assetMachine } from '@/machines';
import { AssetTransformer, SettingTransformer } from '@/transformer';
import { FAsset, FSettingOptions, Id, VAsset, VAssetTable } from '@/types';

import AssetImport from './AssetImport';
import AssetModifier from './AssetModifier';

// type DrawerType = 'create' | 'edit' | 'import' | null;

export default function Page() {
  const [state, send] = useMachine(assetMachine, {});
  // const [editItem, setEditItem] = useState<NType<VAsset>>(null);
  const [page, setPage] = useState<number>(1);
  // const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);

  const {
    data: settingData,
    isPending: settingIsPending,
    refetch: settingRefetch,
  } = useQuery({
    queryFn: () => SettingFetcher.FindAll(),
    queryKey: ['setting'],
  });

  const settingOptions = useMemo<FSettingOptions>(
    () =>
      settingData?.data
        ? SettingTransformer.FSettingOptionsTransformer(settingData.data)
        : SettingConstant.F_SETTING_OPTIONS,
    [settingData],
  );

  const {
    data: assetData,
    isPending: assetIsPending,
    refetch: assetRefetch,
  } = useQuery({
    queryFn: () => AssetFetcher.FindMany({ filters: {}, page, pageSize: 10 }),
    queryKey: ['assetList', page],
  });

  const createAsset = useMutation({
    mutationFn: (payload: FAsset) => AssetFetcher.Create(AssetTransformer.FPAssetTransformer(payload)),
    onSuccess: () => {
      assetRefetch();
    },
  });

  const updateAsset = useMutation({
    mutationFn: ({ payload, id }: { id: VAsset['id']; payload: FAsset }) =>
      AssetFetcher.Update(AssetTransformer.FPAssetTransformer(payload), id),
    onSuccess: () => {
      assetRefetch();
    },
  });

  const deleteAsset = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return AssetFetcher.Delete(id);
      } else {
        throw Error('Deletion terminated.');
      }
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: () => {
      assetRefetch();
    },
  });

  const onItemUpdate = (asset: FAsset, id: VAsset['id']): void => {
    updateAsset.mutate({ id, payload: asset });
  };

  const onItemDelete = (id: VAsset['id']): void => {
    deleteAsset.mutate(id);
  };

  const onCreateSubmit = (data: FAsset) => {
    createAsset.mutate(data);
  };

  const tableData: VAssetTable[] = assetData
    ? assetData.data.map((item) => AssetTransformer.VTAssetTransformer(item, settingOptions))
    : [];
  const columns: ColumnProps<VAssetTable>[] = [
    {
      key: 'name',
      render: (column, item) => <div className="w-[200px] whitespace-pre-wrap">{item.name}</div>,
      title: 'Name',
    },
    {
      key: 'category',
      title: 'Category',
    },
    {
      key: 'brand',
      title: 'Brand',
    },
    {
      key: 'startInfo',
      render: (column, item) => (
        <>
          <div>Date: {item.startInfo.startDate}</div>
          <div>Price: {item.startInfo.startPrice}</div>
          <div>Method: {item.startInfo.startMethod}</div>
          <div>Place: {item.startInfo.startPlatform}</div>
        </>
      ),
      title: 'Start Info',
    },
    {
      key: 'endInfo',
      render: (column, item) => (
        <>
          <div>Date: {item.endInfo.endDate}</div>
          <div>Price: {item.endInfo.endPrice}</div>
          <div>Method: {item.endInfo.endMethod}</div>
          <div>Place: {item.endInfo.endPlatform}</div>
        </>
      ),
      title: 'End Info',
    },
    {
      key: 'meta',
      render: (column, item) => (
        <>
          {item.meta.map((_item, index) => {
            const { key, value } = _item;
            return (
              <div key={index}>
                {key}: {value}
              </div>
            );
          })}
        </>
      ),
      title: 'Meta',
    },
    {
      key: 'priceDifference',
      title: 'Price Diff',
    },
    {
      key: 'usageTime',
      title: 'Usage Time',
    },
    {
      key: 'monthlyCost',
      title: 'monthlyCost',
    },
    {
      key: 'owner',
      title: 'owner',
    },
    {
      key: 'tags',
      render: (column, item) => (
        <div>
          {item.tags.map((_item, _index) => (
            <div key={_index}>
              <span>#</span>
              <span>{_item}</span>
            </div>
          ))}
        </div>
      ),
      title: 'tags',
    },
    {
      key: 'comment',
      render: (column, item) => <div className="w-[100px] whitespace-pre-wrap">{item.comment}</div>,
      title: 'Comment',
    },
    {
      key: 'action',
      render: (column, item) => (
        <BasicButton
          variant="secondary"
          onClick={() =>
            send({
              formValues: AssetTransformer.VFAssetTransformer(item.raw, settingOptions),
              id: item.raw.id,
              type: 'TO_EDIT',
            })
          }
        >
          <BasicIcon iconType="pen-to-square-solid" />
        </BasicButton>
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-4 relative overflow-y-auto h-full flex flex-col">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flx items-center">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Assets</h2>

            <div className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              <span>{assetData ? assetData.totalCount : 0}</span>
              <span>&nbsp;assets</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <TabGroup />

          <SearchInput />

          <BasicButton variant="secondary" onClick={() => send({ type: 'TO_IMPORT' })} className="flex gap-x-2">
            <BasicIcon iconType="file-import-solid" />
            <span>Import</span>
          </BasicButton>

          <BasicButton onClick={() => send({ type: 'TO_CREATE' })} className="flex gap-x-2">
            <BasicIcon iconType="cross" />
            <span>Create</span>
          </BasicButton>
        </div>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        {!assetData ? (
          <LoadingSpinner className="h-full" />
        ) : (
          <>
            <Table data={tableData} columns={columns} />
            <Pagination
              page={page}
              totalPage={assetData.totalPage}
              onNext={() => setPage((prev) => prev + 1)}
              onPrev={() => setPage((prev) => prev - 1)}
              onFirst={() => setPage(1)}
              onLast={() => setPage(assetData.totalPage)}
            />
          </>
        )}
      </div>

      <AssetModifier
        isOpen={state.matches('EDIT') || state.matches('CREATE')}
        onClose={() => send({ type: 'TO_MAIN' })}
        mode={state.matches('EDIT') ? 'edit' : state.matches('CREATE') ? 'create' : undefined}
        onUpdate={(data, id) => {
          onItemUpdate(data, id);
          send({ type: 'TO_MAIN' });
        }}
        onCreate={(data) => {
          onCreateSubmit(data);
          send({ type: 'TO_MAIN' });
        }}
        onDelete={(id) => {
          onItemDelete(id);
          send({ type: 'TO_MAIN' });
        }}
        settingOptions={settingOptions}
        modifierContext={state.context.modifier}
      />

      <AssetImport
        isOpen={state.matches('IMPORT')}
        onClose={() => {
          void send({ type: 'TO_MAIN' });
        }}
        onDone={() => {
          void send({ type: 'TO_MAIN' });
          assetRefetch();
        }}
        onImport={(payload) => {
          void send({ payload, type: 'IMPORT_TASK_TO_QUEUE' });
        }}
        settingOptions={settingOptions}
        state={
          state.matches({ IMPORT: 'PREPARE' })
            ? 'PREPARE'
            : state.matches({ IMPORT: 'PROCESSING' })
              ? 'PROCESSING'
              : 'FINISH'
        }
        importContext={state.context.import}
      />
    </div>
  );
}
