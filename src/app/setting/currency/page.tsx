'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import BasicButton from '@/components/BasicButton';
import Table, { ColumnProps } from '@/components/Table';
import { CurrencyFetcher } from '@/fetcher';
import { CurrencyTransformer } from '@/transformer';
import { FCurrency, Id, NType, VCurrency, VCurrencyTable } from '@/types';

import Create from './Create';
import Item from './Item';

export default function Page() {
  const [editItem, setEditItem] = useState<NType<VCurrency>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => CurrencyFetcher.FindAll(),
    queryKey: ['currencyList'],
  });

  const createCurrency = useMutation({
    mutationFn: (payload: FCurrency) => CurrencyFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateCurrency = useMutation({
    mutationFn: ({ payload, id }: { id: VCurrency['id']; payload: FCurrency }) => CurrencyFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteCurrency = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return CurrencyFetcher.Delete(id);
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

  const tableData: VCurrencyTable[] = data
    ? data.data.map((item) => CurrencyTransformer.VTCurrencyTransformer(item))
    : [];
  const columns: ColumnProps<VCurrencyTable>[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'display',
      title: 'Display',
    },
    {
      key: 'symbol',
      title: 'Symbol',
    },
    {
      key: 'comment',
      title: 'Comment',
    },
    {
      key: 'action',
      render: (column, item) => (
        <BasicButton
          variant="secondary"
          className="bg-slate-500 p-1 rounded-sm text-white"
          onClick={() => onItemEdit(item.raw)}
        >
          Edit
        </BasicButton>
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="font-bold capitalize text-xl my-2">currency setting</div>
      {isPending ? <div>loading...</div> : <Table data={tableData} columns={columns} />}

      <Create onSubmit={onCreateSubmit} className="w-1/2" />
    </div>
  );
}
