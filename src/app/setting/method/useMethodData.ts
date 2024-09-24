import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { MethodFetcher } from '@/fetcher';
import { methodMachine } from '@/machines';
import { MethodTransformer } from '@/transformer';
import { FMethod, Id, VMethod, VMethodTable } from '@/types';

export default function useMethodData() {
  const [state, send] = useMachine(methodMachine, {});

  const { data, isPending, refetch } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => MethodFetcher.FindMany(state.context.searchPayload),
    queryKey: ['methodList', state.context.searchPayload],
  });

  const createMethod = useMutation({
    mutationFn: (payload: FMethod) => MethodFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateMethod = useMutation({
    mutationFn: ({ payload, id }: { id: VMethod['id']; payload: FMethod }) => MethodFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteMethod = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return MethodFetcher.Delete(id);
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

  const onItemUpdate = (method: FMethod, id: VMethod['id']): void => {
    updateMethod.mutate({ id, payload: method });
  };

  const onItemDelete = (id: VMethod['id']): void => {
    deleteMethod.mutate(id);
  };

  const onCreateSubmit = (data: FMethod) => {
    createMethod.mutate(data);
  };

  const tableData: VMethodTable[] = data ? data.data.map((item) => MethodTransformer.VTMethodTransformer(item)) : [];

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
