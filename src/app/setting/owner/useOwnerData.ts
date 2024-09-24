import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { OwnerFetcher } from '@/fetcher';
import { ownerMachine } from '@/machines';
import { OwnerTransformer } from '@/transformer';
import { FOwner, Id, VOwner, VOwnerTable } from '@/types';

export default function useOwnerData() {
  const [state, send] = useMachine(ownerMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => OwnerFetcher.FindMany(state.context.searchPayload),
    queryKey: ['ownerList', state.context.searchPayload],
  });

  const createOwner = useMutation({
    mutationFn: (payload: FOwner) => OwnerFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateOwner = useMutation({
    mutationFn: ({ payload, id }: { id: VOwner['id']; payload: FOwner }) => OwnerFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteOwner = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return OwnerFetcher.Delete(id);
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

  const onItemUpdate = (owner: FOwner, id: VOwner['id']): void => {
    updateOwner.mutate({ id, payload: owner });
  };

  const onItemDelete = (id: VOwner['id']): void => {
    deleteOwner.mutate(id);
  };

  const onCreateSubmit = (data: FOwner) => {
    createOwner.mutate(data);
  };

  const tableData: VOwnerTable[] = data ? data.data.map((item) => OwnerTransformer.VTOwnerTransformer(item)) : [];

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
