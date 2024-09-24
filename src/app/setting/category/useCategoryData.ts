import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { CategoryFetcher } from '@/fetcher';
import { categoryMachine } from '@/machines';
import { CategoryTransformer } from '@/transformer';
import { FCategory, Id, VCategory, VCategoryTable } from '@/types';

export default function useCategoryData() {
  const [state, send] = useMachine(categoryMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => CategoryFetcher.FindMany(state.context.searchPayload),
    queryKey: ['categoryList', state.context.searchPayload],
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

  return {
    data,
    isPending,
    onCreateSubmit,
    onItemDelete,
    onItemUpdate,
    refetch,
    send,
    state,
    tableData,
  };
}
