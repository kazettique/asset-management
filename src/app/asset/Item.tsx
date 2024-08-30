import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { CommonConstant } from '@/constant';
import { AssetTransformer } from '@/transformer';
import { FAsset, FSettingOptions, VAsset } from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

dayjs.extend(relativeTime);
dayjs.extend(duration);
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
    defaultValues: AssetTransformer.VAssetTransformer(props.item),
    resolver: zodResolver(AssetValidator.FAssetValidator),
  });

  const brand = useMemo<string>(() => {
    const findItem = props.settingOptions.brands.find((item) => item.value === props.item.brandId);

    return findItem ? findItem.label : CommonConstant.DEFAULT_EMPTY_STRING;
  }, [props.item.brandId, props.settingOptions.brands]);

  const startMethod = useMemo<string>(() => {
    const findItem = props.settingOptions.startMethods.find((item) => item.value === props.item.startMethodId);

    return findItem ? findItem.label : CommonConstant.DEFAULT_EMPTY_STRING;
  }, [props.item.startMethodId, props.settingOptions.startMethods]);

  const startPlace = useMemo<string>(() => {
    const findItem = props.settingOptions.places.find((item) => item.value === props.item.startPlaceId);

    return findItem ? findItem.label : CommonConstant.DEFAULT_EMPTY_STRING;
  }, [props.item.startPlaceId, props.settingOptions.places]);

  const endMethod = useMemo<string>(() => {
    const findItem = props.settingOptions.endMethods.find((item) => item.value === props.item.endMethodId);

    return findItem ? findItem.label : CommonConstant.DEFAULT_EMPTY_STRING;
  }, [props.item.endMethodId, props.settingOptions.endMethods]);

  const endPlace = useMemo<string>(() => {
    const findItem = props.settingOptions.places.find((item) => item.value === props.item.endPlaceId);

    return findItem ? findItem.label : CommonConstant.DEFAULT_EMPTY_STRING;
  }, [props.item.endPlaceId, props.settingOptions.places]);

  const display = useMemo(() => {
    // startDate
    const _startDate: Dayjs = dayjs(props.item.startDate);
    // startPrice
    const startCurrency = props.settingOptions.currencies.find((item) => item.value === props.item.startCurrencyId);
    // endDate
    const _endDate: Dayjs = props.item.endDate !== null ? dayjs(props.item.endDate) : dayjs();

    // endPrice
    const endCurrency = props.settingOptions.currencies.find((item) => item.value === props.item.endCurrencyId);

    const _priceDifference: number =
      props.item.startCurrencyId === props.item.endCurrencyId && props.item.endPrice
        ? props.item.startPrice - props.item.endPrice
        : props.item.startPrice;

    let monthlyCost: string = '';

    if (startCurrency) {
      const endDate: Dayjs = props.item.endDate !== null ? dayjs(props.item.endDate) : dayjs();
      const startDate: Dayjs = dayjs(props.item.startDate);
      const monthCount: number = endDate.diff(startDate, 'month');

      if (monthCount > 0) {
        monthlyCost = startCurrency.label + Utils.NumberWithCommas(Math.round(_priceDifference / monthCount));
      } else {
        monthlyCost = startCurrency.label + Utils.NumberWithCommas(_priceDifference);
      }
    }

    return {
      endDate: props.item.endDate ? Utils.GetDateTimeString(props.item.endDate) : CommonConstant.DEFAULT_EMPTY_STRING,
      endPrice:
        endCurrency && props.item.endPrice
          ? `${endCurrency.label} ${Utils.NumberWithCommas(props.item.endPrice)}`
          : CommonConstant.DEFAULT_EMPTY_STRING,
      monthlyCost,
      priceDifference: startCurrency
        ? startCurrency.label + Utils.NumberWithCommas(_priceDifference)
        : CommonConstant.DEFAULT_EMPTY_STRING,
      startDate: Utils.GetDateTimeString(_startDate),
      startPrice: startCurrency
        ? `${startCurrency.label} ${Utils.NumberWithCommas(props.item.startPrice)}`
        : CommonConstant.DEFAULT_EMPTY_STRING,
      usageTime: Utils.DetailedRelativeTime(_startDate, _endDate),
    };
  }, [
    props.item.endCurrencyId,
    props.item.endDate,
    props.item.endPrice,
    props.item.startCurrencyId,
    props.item.startDate,
    props.item.startPrice,
    props.settingOptions.currencies,
  ]);

  return (
    <tr key={props.item.id} data-test-comp={Item.name} className="even:bg-slate-100 hover:bg-slate-200">
      {props.isEdit ? (
        <td colSpan={5} className="border border-slate-300 bg-slate-400">
          <form onSubmit={handleSubmit(props.onUpdate)} className="flex">
            <Input register={register} path="name.nameEn" />
            <Input register={register} path="name.nameTw" />
            <Input register={register} path="name.nameJp" />
            <Input register={register} path="brandId" />

            {/* start info */}
            <Input register={register} path="startDate" />
            <div>
              <Input register={register} path="startCurrencyId" />
              <Input register={register} path="startPrice" />
            </div>
            <Input register={register} path="startMethodId" />
            <Input register={register} path="startPlaceId" />

            {/* end info */}
            <Input register={register} path="endDate" />
            <div>
              <Input register={register} path="endCurrencyId" />
              <Input register={register} path="endPrice" />
            </div>
            <Input register={register} path="endMethodId" />
            <Input register={register} path="endPlaceId" />

            <Input register={register} path="comment" />
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
            <div>Date: {display.startDate}</div>
            <div>Price: {display.startPrice}</div>
            <div>Method: {startMethod}</div>
            <div>Place: {startPlace}</div>
          </td>

          {/* end info */}
          <td className="border border-slate-300">
            <div>Date: {display.endDate}</div>
            <div>Price: {display.endPrice}</div>
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
          <td className="border border-slate-300">{display.priceDifference}</td>
          <td className="border border-slate-300">{display.usageTime}</td>
          <td className="border border-slate-300">{display.monthlyCost}</td>
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
