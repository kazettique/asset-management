'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import BasicButton from '@/components/BasicButton';
import BasicFileReader from '@/components/BasicFileReader';
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
    queryFn: () => AssetFetcher.FindAll(),
    queryKey: ['assetList'],
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
      render: (column, item) => <div className="max-w-[300px] whitespace-pre-wrap">{item.name}</div>,
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
    // console.log('event', event);
    const parsedData = Utils.DeepParseJson(event) as any[];

    // console.log('parsedData', parsedData);

    const compensate = parsedData.map((item) => ({
      ...item,
      brandId: '46241c99-a7f3-49d3-b2f1-6d2916b32e09',
      categoryId: '28c40ba8-55c5-4171-a317-824c6aba09b3',
      endCurrencyId: '8c468df4-bc10-4f2f-91f3-6bba0ed94d4e',
      endDate: item.endDate || null,
      endMethodId: 'af0dff05-5bb0-4b18-bccc-9b54509edd10',
      endPlatformId: '9bace7c8-d2b1-4487-8a3e-26190acc1c20',
      endPrice: item.endPrice || 0,
      isCensored: false,
      meta: [],
      ownerId: '59efb179-59f0-4e89-99e1-027ae46d187a',
      placeId: '21a1d59e-c69d-4ec9-b7d4-304c7e216aa0',
      startCurrencyId: '8c468df4-bc10-4f2f-91f3-6bba0ed94d4e',
      startDate: item.startDate || null,
      startMethodId: 'af0dff05-5bb0-4b18-bccc-9b54509edd10',
      startPlatformId: '9bace7c8-d2b1-4487-8a3e-26190acc1c20',
      startPrice: item.startPrice || 0,
    }));

    // console.log('compensate', compensate);

    const validation = AssetValidator.PBatchAssetValidator.array().safeParse(compensate);

    if (!validation.success) {
      // console.log('validation.error', validation.error);
    } else {
      // console.log('validation.data', validation.data);
      await AssetFetcher.CreateMany(validation.data);
      assetRefetch();
    }
  };

  return (
    <div className="p-4 relative overflow-y-auto overflow-x-hidden h-full">
      <section className="container mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">Assets</h2>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                240 vendors
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              These companies have purchased in the last 12 months.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-3">
            <BasicFileReader onChange={handleImport} label="import" />

            <button
              onClick={() => setIsActive(true)}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <span>Create Asset</span>
            </button>
          </div>
        </div>

        <div className="mt-6 md:flex md:items-center md:justify-between">
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
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {assetIsPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}
            </div>
          </div>
        </div>

        <div className="mt-6 sm:flex sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
          </div>

          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <a
              href="/"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>

              <span> previous </span>
            </a>

            <a
              href="/"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span> Next </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Create
        onClose={() => setIsActive(false)}
        onSubmit={onCreateSubmit}
        settingOptions={settingOptions}
        className={`absolute w-full h-full top-0 transition-all ${isActive ? 'left-0' : 'left-full'}`}
      />

      {/* <Modal isOpen={modalOpen} onClose={() => setModelOpen(false)} /> */}
      {/* <Drawer /> */}
    </div>
  );
}
