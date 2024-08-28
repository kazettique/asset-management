import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FAsset, VAsset } from '@/types';
import { Utils } from '@/utils';
import { AssetValidator } from '@/validator';

interface Props {
  isEdit: boolean;
  item: VAsset;
  onCancel: () => void;
  onDelete: (id: VAsset['id']) => void;
  onEdit: (item: VAsset) => void;
  onUpdate: (item: FAsset) => void;
}

export default function Item(props: Props) {
  const { register, handleSubmit } = useForm<FAsset>({
    defaultValues: props.item,
    resolver: zodResolver(AssetValidator.FAssetValidator),
  });

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
          <td className="border border-slate-300">{props.item.name.nameEn}</td>
          <td className="border border-slate-300">{props.item.name.nameTw}</td>
          <td className="border border-slate-300">{props.item.name.nameJp}</td>
          <td className="border border-slate-300">{props.item.brandId}</td>

          {/* start info */}
          <td className="border border-slate-300">{Utils.GetDateTimeString(props.item.startDate)}</td>
          <td className="border border-slate-300">
            {props.item.startCurrencyId} - {props.item.startPrice}
          </td>
          <td className="border border-slate-300">{props.item.startMethodId}</td>
          <td className="border border-slate-300">{props.item.startPlaceId}</td>

          {/* end info */}
          <td className="border border-slate-300">
            {props.item.endDate ? Utils.GetDateTimeString(props.item.endDate) : '--'}
          </td>
          <td className="border border-slate-300">
            {props.item.endCurrencyId} - {props.item.endPrice}
          </td>
          <td className="border border-slate-300">{props.item.endMethodId}</td>
          <td className="border border-slate-300">{props.item.endPlaceId}</td>

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
