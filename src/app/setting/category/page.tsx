'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import Table, { ColumnProps } from '@/components/Table';
import { CategoryFetcher } from '@/fetcher';
import { categoryMachine } from '@/machines';
import { CategoryTransformer } from '@/transformer';
import { FCategory, Id, VCategory, VCategoryTable } from '@/types';

import CategoryModifier from './CategoryModifier';

export default function Page() {
  const [state, send] = useMachine(categoryMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => CategoryFetcher.FindAll(),
    queryKey: ['categoryList'],
  });

  const createCategory = useMutation({
    mutationFn: (payload: FCategory) => CategoryFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ payload, id }: { id: VCategory['id']; payload: FCategory }) => CategoryFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return CategoryFetcher.Delete(id);
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

  const onItemUpdate = (category: FCategory, id: VCategory['id']): void => {
    updateCategory.mutate({ id, payload: category });
  };

  const onItemDelete = (id: VCategory['id']): void => {
    deleteCategory.mutate(id);
  };

  const onCreateSubmit = (data: FCategory) => {
    createCategory.mutate(data);
  };

  const tableData: VCategoryTable[] = data
    ? data.data.map((item) => CategoryTransformer.VTCategoryTransformer(item))
    : [];
  const columns: ColumnProps<VCategoryTable>[] = [
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
        <BasicButton
          variant="secondary"
          onClick={() => {
            send({ formValues: CategoryTransformer.VFCategoryTransformer(item.raw), id: item.raw.id, type: 'TO_EDIT' });
          }}
        >
          <BasicIcon iconType="pen-to-square-solid" />
        </BasicButton>
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Categories</h2>
        <BasicButton onClick={() => send({ type: 'TO_CREATE' })}>Create</BasicButton>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        {!data ? <LoadingSpinner className="h-full" /> : <Table data={tableData} columns={columns} />}
      </div>

      <CategoryModifier
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
