'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import BasicButton from '@/components/BasicButton';
import BasicFileReader from '@/components/BasicFileReader';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';
import SearchInput from '@/components/SearchInput';
import Table, { ColumnProps } from '@/components/Table';
import { SettingConstant } from '@/constant';
import { AssetFetcher, SettingFetcher } from '@/fetcher';
import { AssetTransformer, SettingTransformer } from '@/transformer';
import { FAsset, FSettingOptions, Id, NType, VAsset, VAssetTable } from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

import Create from './Create';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VAsset>>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

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
    queryFn: () => AssetFetcher.FindMany({ page, pageSize: 10 }),
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
      setEditItem(null);
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

  const onItemEdit = (asset: VAsset): void => {
    setEditItem(asset);
  };

  const onItemUpdate = (asset: FAsset, id: VAsset['id']): void => {
    updateAsset.mutate({ id, payload: asset });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
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
          className="bg-slate-500 p-1 rounded-sm text-white"
          onClick={() => onItemEdit(item.raw)}
        >
          Edit
        </BasicButton>
      ),
      title: 'Action',
    },
  ];

  const handleImport = async (event: any) => {
    const parsedData = Utils.DeepParseJson(event) as any[];

    const csvValidation = AssetValidator.VAssetImportItemValidator.array().safeParse(parsedData);

    if (!csvValidation.success) {
      alert('illegal csv format!');
    } else {
      const payloadData = parsedData.map((item) => AssetTransformer.VAssetImportTransformer(item));

      await AssetFetcher.CreateMany(payloadData);
      assetRefetch();
    }
  };

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
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
              View all
            </button>

            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Monitored
            </button>

            <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Unmonitored
            </button>
          </div>

          <SearchInput />

          <BasicFileReader onChange={handleImport} label="import" />

          <button
            onClick={() => setIsActive(true)}
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
          >
            <BasicIcon iconType="cross" />

            <span>Create Asset</span>
          </button>
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

      {/* <Create
        onClose={() => setIsActive(false)}
        onSubmit={onCreateSubmit}
        settingOptions={settingOptions}
        className={`absolute w-full h-full top-0 transition-all ${isActive ? 'left-0' : 'left-full'}`}
      /> */}

      {/* <Modal isOpen={modalOpen} onClose={() => setModelOpen(false)} /> */}
      {/* <Drawer /> */}
    </div>
  );
}
