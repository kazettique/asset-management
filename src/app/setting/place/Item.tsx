import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { FPlace, VPlace } from '@/types';
import { PlaceValidator } from '@/validator';

interface Props {
  isEdit: boolean;
  item: VPlace;
  onCancel: () => void;
  onDelete: (id: VPlace['id']) => void;
  onEdit: (item: VPlace) => void;
  onUpdate: (item: FPlace) => void;
}

export default function Item(props: Props) {
  const { register, handleSubmit } = useForm<FPlace>({
    defaultValues: props.item,
    resolver: zodResolver(PlaceValidator.FPlaceValidator),
  });

  return (
    <tr key={props.item.id} data-test-comp={Item.name} className="even:bg-slate-100 hover:bg-slate-200">
      {props.isEdit ? (
        <td colSpan={5} className="border border-slate-300 bg-slate-400">
          <form onSubmit={handleSubmit(props.onUpdate)} className="flex">
            <Input register={register} path="name.nameEn" className="w-1/5" />
            <Input register={register} path="name.nameTw" className="w-1/5" />
            <Input register={register} path="name.nameJp" className="w-1/5" />
            <Input register={register} path="comment" className="w-1/5" />
            <div className="w-1/5 gap-x-2 flex">
              <Button type="submit">Save</Button>
              <Button variant="danger" onClick={() => props.onDelete(props.item.id)}>
                Del
              </Button>
              <Button variant="secondary" onClick={() => props.onCancel()}>
                Cancel
              </Button>
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
