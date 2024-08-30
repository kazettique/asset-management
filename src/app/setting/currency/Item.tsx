import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { FCurrency, VCurrency } from '@/types';
import { CurrencyValidator } from '@/validator';

interface Props {
  isEdit: boolean;
  item: VCurrency;
  onCancel: () => void;
  onDelete: (id: VCurrency['id']) => void;
  onEdit: (item: VCurrency) => void;
  onUpdate: (item: FCurrency) => void;
}

export default function Item(props: Props) {
  const { register, handleSubmit } = useForm<FCurrency>({
    defaultValues: props.item,
    resolver: zodResolver(CurrencyValidator.FCurrencyValidator),
  });

  return (
    <tr key={props.item.id} data-test-comp={Item.name} className="even:bg-slate-100 hover:bg-slate-200">
      {props.isEdit ? (
        <td colSpan={5} className="border border-slate-300 bg-slate-400">
          <form onSubmit={handleSubmit(props.onUpdate)} className="flex">
            <Input register={register} path="name" className="w-1/5" />
            <Input register={register} path="display" className="w-1/5" />
            <Input register={register} path="symbol" className="w-1/5" />
            <Input register={register} path="comment" className="w-1/5" />
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
          <td className="border border-slate-300">{props.item.name}</td>
          <td className="border border-slate-300">{props.item.display}</td>
          <td className="border border-slate-300">{props.item.symbol}</td>
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
