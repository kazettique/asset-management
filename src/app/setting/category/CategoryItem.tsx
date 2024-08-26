import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FCategory, VCategory } from '@/types';
import { FCategoryValidator } from '@/validator';

interface Props {
  category: VCategory;
  isEdit: boolean;
  onCancel: () => void;
  onDelete: (id: VCategory['id']) => void;
  onEdit: (category: VCategory) => void;
  onUpdate: (category: FCategory) => void;
}

export default function CategoryItem(props: Props) {
  const { register, handleSubmit } = useForm<FCategory>({
    defaultValues: props.category,
    resolver: zodResolver(FCategoryValidator),
  });

  return (
    <tr key={props.category.id} data-test-comp={CategoryItem.name} className="even:bg-slate-100 hover:bg-slate-200">
      {props.isEdit ? (
        <td colSpan={5} className="border border-slate-300 bg-slate-400">
          <form onSubmit={handleSubmit(props.onUpdate)} className="flex">
            <input {...register('name.nameEn')} className="bg-slate-400 w-1/5" />
            <input {...register('name.nameTw')} className="bg-slate-400 w-1/5" />
            <input {...register('name.nameJp')} className="bg-slate-400 w-1/5" />
            <input {...register('comment')} name="comment" className="bg-slate-400 w-1/5" />
            <div className="w-1/5 gap-x-2 flex">
              <button className="bg-slate-500 p-1 rounded-sm text-white">Save</button>
              <button className="bg-slate-300 p-1 rounded-sm text-white" onClick={() => props.onCancel()}>
                Cancel
              </button>
            </div>
          </form>
        </td>
      ) : (
        <>
          <td className="border border-slate-300">{props.category.name.nameEn}</td>
          <td className="border border-slate-300">{props.category.name.nameTw}</td>
          <td className="border border-slate-300">{props.category.name.nameJp}</td>
          <td className="border border-slate-300">{props.category.comment}</td>
          <td className="border border-slate-300 flex gap-x-2">
            <button className="bg-slate-500 p-1 rounded-sm text-white" onClick={() => props.onEdit(props.category)}>
              Edit
            </button>
            <button className="bg-red-500 p-1 rounded-sm text-white" onClick={() => props.onDelete(props.category.id)}>
              Del
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
