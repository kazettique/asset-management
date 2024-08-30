'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { SettingConstant } from '@/constant';
import { AssetFetcher, SettingFetcher } from '@/fetcher';
import { AssetTransformer, SettingTransformer } from '@/transformer';
import { FAsset, Id, NType, VAsset } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VAsset>>(null);

  const {
    data: settingData,
    isPending: settingIsPending,
    refetch: settingRefetch,
  } = useQuery({
    queryFn: () => SettingFetcher.getAll(),
    queryKey: ['setting'],
  });

  const settingOptions = useMemo(
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
    queryFn: () => AssetFetcher.getAll(),
    queryKey: ['assetList'],
  });

  const createAsset = useMutation({
    mutationFn: (payload: FAsset) => AssetFetcher.create(AssetTransformer.FAssetTransformer(payload)),
    onSuccess: () => {
      assetRefetch();
    },
  });

  const updateAsset = useMutation({
    mutationFn: ({ payload, id }: { id: VAsset['id']; payload: FAsset }) =>
      AssetFetcher.update(AssetTransformer.FAssetTransformer(payload), id),
    onSuccess: () => {
      assetRefetch();
      setEditItem(null);
    },
  });

  const deleteAsset = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return AssetFetcher.delete(id);
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

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">asset setting</div>
      {assetIsPending ? (
        <div>loading...</div>
      ) : (
        <table className="table-fixed overflow-x-auto border-collapse border border-slate-300">
          <thead>
            <tr>
              <th className="border border-slate-300 w-40">Name</th>
              <th className="border border-slate-300">Brand</th>
              <th className="border border-slate-300">Start Info</th>
              <th className="border border-slate-300">End Info</th>
              <th className="border border-slate-300">Meta</th>
              <th className="border border-slate-300">Price Diff</th>
              <th className="border border-slate-300">Usage Time</th>
              <th className="border border-slate-300">Monthly Cost</th>
              <th className="border border-slate-300">Comment</th>
              <th className="border border-slate-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {assetData &&
              assetData.data.map((item, _index) => (
                <Item
                  key={item.id}
                  item={item}
                  isEdit={editItem !== null ? item.id === editItem.id : false}
                  onCancel={() => onItemCancel()}
                  onEdit={(asset) => onItemEdit(asset)}
                  onDelete={(id) => onItemDelete(id)}
                  onUpdate={(asset) => onItemUpdate(asset, item.id)}
                  settingOptions={settingOptions}
                />
              ))}
          </tbody>
        </table>
      )}

      <Create onSubmit={onCreateSubmit} settingOptions={settingOptions} className="w-full" />
    </div>
  );
}
