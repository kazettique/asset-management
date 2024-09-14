import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { useMemo } from 'react';

import { SettingConstant } from '@/constant';
import { AssetFetcher, SettingFetcher } from '@/fetcher';
import { assetMachine } from '@/machines';
import { AssetTransformer, SettingTransformer } from '@/transformer';
import { FAsset, FSettingOptions, Id, VAsset, VAssetTable } from '@/types';

export default function useAssetData() {
  // const [page, setPage] = useState<number>(1);
  const [state, send] = useMachine(assetMachine, {});

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

  const tableData: VAssetTable[] = assetData
    ? assetData.data.map((item) => AssetTransformer.VTAssetTransformer(item))
    : [];

  return {
    assetData,
    assetIsPending,
    assetRefetch,
    onCreateSubmit,
    onItemDelete,
    onItemUpdate,
    send,
    settingOptions,
    state,
    tableData,
  };
}
