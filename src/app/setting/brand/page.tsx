'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';
import { useState } from 'react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { BrandFetcher } from '@/fetcher';
import { brandMachine } from '@/machines';
import { BrandTransformer } from '@/transformer';
import { FBrand, Id, NType, VBrand, VBrandTable } from '@/types';

import BrandModifier from './BrandModifier';

export default function Page() {
  const [state, send] = useMachine(brandMachine, {});

  const [editItem, setEditItem] = useState<NType<VBrand>>(null);

  const { data, isPending, refetch } = useQuery({
    queryFn: () => BrandFetcher.FindAll(),
    queryKey: ['brandList'],
  });

  const createBrand = useMutation({
    mutationFn: (payload: FBrand) => BrandFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateBrand = useMutation({
    mutationFn: ({ payload, id }: { id: VBrand['id']; payload: FBrand }) => BrandFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
      setEditItem(null);
    },
  });

  const deleteBrand = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return BrandFetcher.Delete(id);
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

  const onItemEdit = (brand: VBrand): void => {
    setEditItem(brand);
  };

  const onItemUpdate = (brand: FBrand, id: VBrand['id']): void => {
    updateBrand.mutate({ id, payload: brand });
  };

  const onItemCancel = (): void => {
    setEditItem(null);
  };

  const onItemDelete = (id: VBrand['id']): void => {
    deleteBrand.mutate(id);
  };

  const onCreateSubmit = (data: FBrand) => {
    createBrand.mutate(data);
  };

  const tableData: VBrandTable[] = data ? data.data.map((item) => BrandTransformer.VTBrandTransformer(item)) : [];
  const columns: ColumnProps<VBrandTable>[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'comment',
      title: 'Comment',
    },
    {
      key: 'action',
      render: (column, item) => (
        <BasicIcon
          className="bg-slate-500 shadow-slate-500/20 hover:shadow-slate-500/40 p-2 rounded-md text-white cursor-pointer"
          iconType="pen-to-square-solid"
          onClick={() =>
            void send({ formValues: BrandTransformer.VFBrandTransformer(item.raw), id: item.raw.id, type: 'TO_EDIT' })
          }
        />
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Brands</h2>
        <BasicButton onClick={() => send({ type: 'TO_CREATE' })}>Create</BasicButton>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        {!data ? <LoadingSpinner className="h-full" /> : <Table data={tableData} columns={columns} />}
      </div>

      <BrandModifier
        isOpen={state.matches('EDIT') || state.matches('CREATE')}
        onClose={() => send({ type: 'TO_MAIN' })}
        mode={state.matches('EDIT') ? 'edit' : state.matches('CREATE') ? 'create' : undefined}
        onUpdate={(data, id) => {
          onItemUpdate(data, id);
          send({ type: 'TO_MAIN' });
        }}
        onCreate={(data) => {
          onCreateSubmit(data);
          send({ type: 'TO_MAIN' });
        }}
        onDelete={(id) => {
          onItemDelete(id);
          send({ type: 'TO_MAIN' });
        }}
        defaultValues={state.context.formValues}
        id={state.context.id}
      />
    </div>
  );
}
