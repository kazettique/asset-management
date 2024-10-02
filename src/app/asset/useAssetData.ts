import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { useMemo } from 'react';

import { CommonConstant, SettingConstant } from '@/constant';
import { AssetFetcher, SettingFetcher } from '@/fetcher';
import { assetMachine } from '@/machines';
import { AssetTransformer, SettingTransformer } from '@/transformer';
import { FAsset, FormOption, FSettingOptions, Id, VAsset, VAssetTable } from '@/types';

export default function useAssetData() {
  const [state, send] = useMachine(assetMachine, {});

  const {
    data: settingOptionsData,
    isPending: settingIsPending,
    refetch: settingRefetch,
  } = useQuery({
    queryFn: () => SettingFetcher.FindAllOptions(),
    queryKey: ['setting options'],
  });

  const settingOptions = useMemo<FSettingOptions>(
    () =>
      settingOptionsData?.data
        ? SettingTransformer.FSettingOptionsTransformer(settingOptionsData.data)
        : SettingConstant.DEFAULT_F_SETTING_OPTIONS,
    [settingOptionsData],
  );

  const {
    data: assetData,
    isPending: assetIsPending,
    refetch: assetRefetch,
  } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => AssetFetcher.FindMany(state.context.searchPayload),
    queryKey: ['assetList', state.context.searchPayload],
  });

  const createAsset = useMutation({
    mutationFn: (payload: FAsset) => AssetFetcher.Create(AssetTransformer.FPAssetTransformer(payload)),
    onSuccess: () => {
      assetRefetch();
      settingRefetch();
    },
  });

  const updateAsset = useMutation({
    mutationFn: ({ payload, id }: { id: VAsset['id']; payload: FAsset }) =>
      AssetFetcher.Update(AssetTransformer.FPAssetTransformer(payload), id),
    onSuccess: () => {
      assetRefetch();
      settingRefetch();
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

  const currencyOptions = useMemo<FormOption[]>(
    () =>
      CommonConstant.CURRENCY_CODE_ALL_OPTIONS.filter((option) =>
        settingOptionsData ? settingOptionsData.data.currencyOptionList.includes(option.value) : [],
      ),
    [settingOptionsData],
  );

  const tableData: VAssetTable[] = assetData
    ? assetData.data.map((item) =>
        AssetTransformer.VTAssetTransformer(item, settingOptionsData?.data.displayForex || null),
      )
    : [];

  return {
    assetData,
    assetIsPending,
    assetRefetch,
    currencyOptions,
    onCreateSubmit,
    onItemDelete,
    onItemUpdate,
    send,
    settingOptions,
    settingRefetch,
    state,
    tableData,
  };
}
