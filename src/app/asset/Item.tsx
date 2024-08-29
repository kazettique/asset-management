import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Constants } from '@/constant';
import { FAsset, FSettingOptions, VAsset } from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

interface Props {
  isEdit: boolean;
  item: VAsset;
  onCancel: () => void;
  onDelete: (id: VAsset['id']) => void;
  onEdit: (item: VAsset) => void;
  onUpdate: (item: FAsset) => void;
  settingOptions: FSettingOptions;
}

export default function Item(props: Props) {
  const { register, handleSubmit } = useForm<FAsset>({
    defaultValues: props.item,
    resolver: zodResolver(AssetValidator.FAssetValidator),
  });

  const brand = useMemo(() => {
    const findItem = props.settingOptions.brands.find((item) => item.value === props.item.brandId);

    return findItem ? findItem.label : Constants.DEFAULT_EMPTY_STRING;
  }, [props.item.brandId, props.settingOptions.brands]);

  const startDate = Utils.GetDateTimeString(props.item.startDate);

  const startPrice = useMemo(() => {
    const findItem = props.settingOptions.currencies.find((item) => item.value === props.item.startCurrencyId);

    return findItem
      ? `${findItem.label} ${Utils.NumberWithCommas(props.item.startPrice)}`
      : Constants.DEFAULT_EMPTY_STRING;
  }, [props.item.startCurrencyId, props.item.startPrice, props.settingOptions.currencies]);

  const startMethod = useMemo(() => {
    const findItem = props.settingOptions.methods.find((item) => item.value === props.item.startMethodId);

    return findItem ? findItem.label : Constants.DEFAULT_EMPTY_STRING;
  }, [props.item.startMethodId, props.settingOptions.methods]);

  const startPlace = useMemo(() => {
    const findItem = props.settingOptions.places.find((item) => item.value === props.item.startPlaceId);

    return findItem ? findItem.label : Constants.DEFAULT_EMPTY_STRING;
  }, [props.item.startPlaceId, props.settingOptions.places]);

  const endPrice = useMemo(() => {
    const findItem = props.settingOptions.currencies.find((item) => item.value === props.item.endCurrencyId);

    return findItem && props.item.endPrice
      ? `${findItem.label} ${Utils.NumberWithCommas(props.item.endPrice)}`
      : Constants.DEFAULT_EMPTY_STRING;
  }, [props.item.endCurrencyId, props.item.endPrice, props.settingOptions.currencies]);

  const endMethod = useMemo(() => {
    const findItem = props.settingOptions.methods.find((item) => item.value === props.item.endMethodId);

    return findItem ? findItem.label : Constants.DEFAULT_EMPTY_STRING;
  }, [props.item.endMethodId, props.settingOptions.methods]);

  const endPlace = useMemo(() => {
    const findItem = props.settingOptions.places.find((item) => item.value === props.item.endPlaceId);

    return findItem ? findItem.label : Constants.DEFAULT_EMPTY_STRING;
  }, [props.item.endPlaceId, props.settingOptions.places]);

  const endDate = props.item.endDate ? Utils.GetDateTimeString(props.item.endDate) : Constants.DEFAULT_EMPTY_STRING;

  // const

  return (
    <tr key={props.item.id} data-test-comp={Item.name} className="even:bg-slate-100 hover:bg-slate-200">
      {props.isEdit ? (
        <td colSpan={5} className="border border-slate-300 bg-slate-400">
          <form onSubmit={handleSubmit(props.onUpdate)} className="flex">
            <input {...register('name.nameEn')} className="bg-slate-400 w-1/5" />
            <input {...register('name.nameTw')} className="bg-slate-400 w-1/5" />
            <input {...register('name.nameJp')} className="bg-slate-400 w-1/5" />
            <input {...register('brandId')} className="bg-slate-400 w-1/5" />

            {/* start info */}
            <input {...register('startDate')} className="bg-slate-400 w-1/5" />
            <div>
              <input {...register('startCurrencyId')} className="bg-slate-400 w-1/5" />
              <input {...register('startPrice')} className="bg-slate-400 w-1/5" />
            </div>
            <input {...register('startMethodId')} className="bg-slate-400 w-1/5" />
            <input {...register('startPlaceId')} className="bg-slate-400 w-1/5" />

            {/* end info */}
            <input {...register('endDate')} className="bg-slate-400 w-1/5" />
            <div>
              <input {...register('endCurrencyId')} className="bg-slate-400 w-1/5" />
              <input {...register('endPrice')} className="bg-slate-400 w-1/5" />
            </div>
            <input {...register('endMethodId')} className="bg-slate-400 w-1/5" />
            <input {...register('endPlaceId')} className="bg-slate-400 w-1/5" />

            <input {...register('comment')} name="comment" className="bg-slate-400 w-1/5" />
            <div className="w-1/5 gap-x-2 flex">
              <button className="bg-slate-500 p-1 rounded-sm text-white">Save</button>
              <button className="bg-red-500 p-1 rounded-sm text-white" onClick={() => props.onDelete(props.item.id)}>
                Del
              </button>
              <button className="bg-slate-300 p-1 rounded-sm text-white" onClick={() => props.onCancel()}>
                Cancel
              </button>
            </div>
          </form>
        </td>
      ) : (
        <>
          <td className="border border-slate-300">
            <div>En: {props.item.name.nameEn}</div>
            <div>Tw: {props.item.name.nameTw}</div>
            <div>Jp: {props.item.name.nameJp}</div>
          </td>
          <td className="border border-slate-300">{brand}</td>

          {/* start info */}
          <td className="border border-slate-300">
            <div>Date: {startDate}</div>
            <div>Price: {startPrice}</div>
            <div>Method: {startMethod}</div>
            <div>Place: {startPlace}</div>
          </td>

          {/* end info */}
          <td className="border border-slate-300">
            <div>Date: {endDate}</div>
            <div>Price: {endPrice}</div>
            <div>Method: {endMethod}</div>
            <div>Place: {endPlace}</div>
          </td>

          <td className="border border-slate-300">
            {Object.entries(props.item.meta).map(([key, value]) => (
              <div key={key}>
                {key}: {value}
              </div>
            ))}
          </td>
          <td className="border border-slate-300">{props.item.comment}</td>
          <td className="border border-slate-300 flex gap-x-2">
            <button className="bg-slate-500 p-1 rounded-sm text-white" onClick={() => props.onEdit(props.item)}>
              Edit
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
