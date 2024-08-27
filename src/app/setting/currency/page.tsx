'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { CurrencyFetcher } from '@/fetcher';
import { FCurrency, Id, NType, VCurrency } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VCurrency>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => CurrencyFetcher.getAll(),
    queryKey: ['currencyList'],
  });

  const createCurrency = useMutation({
    mutationFn: (payload: FCurrency) => CurrencyFetcher.create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateCurrency = useMutation({
    mutationFn: ({ payload, id }: { id: VCurrency['id']; payload: FCurrency }) => CurrencyFetcher.update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteCurrency = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return CurrencyFetcher.delete(id);
      } else {
        throw Error('Deletion terminated.');
      }
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onItemEdit = (currency: VCurrency): void => {
    setEditItem(currency);
  };

  const onItemUpdate = (currency: FCurrency, id: VCurrency['id']): void => {
    updateCurrency.mutate({ id, payload: currency });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VCurrency['id']): void => {
    deleteCurrency.mutate(id);
  };

  const onCreateSubmit = (data: FCurrency) => {
    createCurrency.mutate(data);
  };

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">currency setting</div>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <table className="table-fixed border-collapse border border-slate-300 w-full">
          <thead>
            <tr>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">Display</th>
              <th className="border border-slate-300">Symbol</th>
              <th className="border border-slate-300">Comment</th>
              <th className="border border-slate-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((item, _index) => (
                <Item
                  key={item.id}
                  item={item}
                  isEdit={editItem !== null ? item.id === editItem.id : false}
                  onCancel={() => onItemCancel()}
                  onEdit={(currency) => onItemEdit(currency)}
                  onDelete={(id) => onItemDelete(id)}
                  onUpdate={(currency) => onItemUpdate(currency, item.id)}
                />
              ))}
          </tbody>
        </table>
      )}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
