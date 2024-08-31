import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { FBrand, VBrand } from '@/types';
import { BrandValidator } from '@/validator';

interface Props {
  isEdit: boolean;
  item: VBrand;
  onCancel: () => void;
  onDelete: (id: VBrand['id']) => void;
  onEdit: (item: VBrand) => void;
  onUpdate: (item: FBrand) => void;
}

export default function Item(props: Props) {
  const { register, handleSubmit } = useForm<FBrand>({
    defaultValues: props.item,
    resolver: zodResolver(BrandValidator.FBrandValidator),
  });

  return (
    <tr key={props.item.id} data-test-comp={Item.name} className="even:bg-slate-100 hover:bg-slate-200">
      {props.isEdit ? (
        <td colSpan={5} className="border border-slate-300 bg-slate-400">
          <form onSubmit={handleSubmit(props.onUpdate)} className="flex">
            <Input register={register} path="name" className="w-1/5" />
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
          <td className="border border-slate-300">{props.item.name}</td>
          <td className="border border-slate-300">{props.item.comment}</td>
          <td className="border border-slate-300 flex gap-x-2">
            <Button variant="secondary" onClick={() => props.onEdit(props.item)}>
              Edit
            </Button>
          </td>
        </>
      )}
    </tr>
  );
}
