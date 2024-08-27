import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FBrand, VBrand } from '@/types';
import { FBrandValidator } from '@/validator';

interface Props {
  brand: VBrand;
  isEdit: boolean;
  onCancel: () => void;
  onDelete: (id: VBrand['id']) => void;
  onEdit: (brand: VBrand) => void;
  onUpdate: (brand: FBrand) => void;
}

export default function BrandItem(props: Props) {
  const { register, handleSubmit } = useForm<FBrand>({
    defaultValues: props.brand,
    resolver: zodResolver(FBrandValidator),
  });

  return (
    <tr key={props.brand.id} data-test-comp={BrandItem.name} className="even:bg-slate-100 hover:bg-slate-200">
      {props.isEdit ? (
        <td colSpan={5} className="border border-slate-300 bg-slate-400">
          <form onSubmit={handleSubmit(props.onUpdate)} className="flex">
            <input {...register('name.nameEn')} className="bg-slate-400 w-1/5" />
            <input {...register('name.nameTw')} className="bg-slate-400 w-1/5" />
            <input {...register('name.nameJp')} className="bg-slate-400 w-1/5" />
            <input {...register('comment')} name="comment" className="bg-slate-400 w-1/5" />
            <div className="w-1/5 gap-x-2 flex">
              <button className="bg-slate-500 p-1 rounded-sm text-white">Save</button>
              <button className="bg-red-500 p-1 rounded-sm text-white" onClick={() => props.onDelete(props.brand.id)}>
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
          <td className="border border-slate-300">{props.brand.name.nameEn}</td>
          <td className="border border-slate-300">{props.brand.name.nameTw}</td>
          <td className="border border-slate-300">{props.brand.name.nameJp}</td>
          <td className="border border-slate-300">{props.brand.comment}</td>
          <td className="border border-slate-300 flex gap-x-2">
            <button className="bg-slate-500 p-1 rounded-sm text-white" onClick={() => props.onEdit(props.brand)}>
              Edit
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
