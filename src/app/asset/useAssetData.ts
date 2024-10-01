import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { useMemo } from 'react';

import { CommonConstant, SettingConstant } from '@/constant';
import { AssetFetcher, SettingFetcher } from '@/fetcher';
import { assetMachine } from '@/machines';
import { AssetTransformer, SettingTransformer } from '@/transformer';
import { FAsset, FormOption, FSettingOptions, Id, SettingKey, VAsset, VAssetTable } from '@/types';

export default function useAssetData() {
  const [state, send] = useMachine(assetMachine, {});

  const {
    data: settingData,
    isPending: settingIsPending,
    refetch: settingRefetch,
  } = useQuery({
    queryFn: () => SettingFetcher.FindAllOptions(),
    queryKey: ['setting'],
  });

  const settingOptions = useMemo<FSettingOptions>(
    () =>
      settingData?.data
        ? SettingTransformer.FSettingOptionsTransformer(settingData.data)
        : SettingConstant.DEFAULT_F_SETTING_OPTIONS,
    [settingData],
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

  const { data: settingCurrencyOptionListData } = useQuery({
    queryFn: () => SettingFetcher.FindById(SettingConstant.DEFAULT_M_SETTING_CURRENCY_OPTION_LIST.id),
    queryKey: ['setting currency option list'],
  });

  const currencyOptions = useMemo<FormOption[]>(
    () =>
      CommonConstant.CURRENCY_CODE_ALL_OPTIONS.filter((option) =>
        settingCurrencyOptionListData && settingCurrencyOptionListData.data.key === SettingKey.CURRENCY_OPTION_LIST
          ? settingCurrencyOptionListData.data.value.includes(option.value)
          : [],
      ),
    [settingCurrencyOptionListData],
  );

  const tableData: VAssetTable[] = assetData
    ? assetData.data.map((item) => AssetTransformer.VTAssetTransformer(item))
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
    state,
    tableData,
  };
}
