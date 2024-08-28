import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FOwner, VOwner } from '@/types';
import { OwnerValidator } from '@/validator';

interface Props {
  isEdit: boolean;
  item: VOwner;
  onCancel: () => void;
  onDelete: (id: VOwner['id']) => void;
  onEdit: (item: VOwner) => void;
  onUpdate: (item: FOwner) => void;
}

export default function Item(props: Props) {
  const { register, handleSubmit } = useForm<FOwner>({
    defaultValues: props.item,
    resolver: zodResolver(OwnerValidator.FOwnerValidator),
  });

  return (
    <tr key={props.item.id} data-test-comp={Item.name} className="even:bg-slate-100 hover:bg-slate-200">
      {props.isEdit ? (
        <td colSpan={5} className="border border-slate-300 bg-slate-400">
          <form onSubmit={handleSubmit(props.onUpdate)} className="flex">
            <input {...register('name.nameEn')} className="bg-slate-400 w-1/5" />
            <input {...register('name.nameTw')} className="bg-slate-400 w-1/5" />
            <input {...register('name.nameJp')} className="bg-slate-400 w-1/5" />
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
