import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { PlatformFetcher } from '@/fetcher';
import { placeMachine } from '@/machines/place';
import { PlatformTransformer } from '@/transformer';
import { FPlatform, Id, VPlatform, VPlatformTable } from '@/types';

export default function usePlatformData() {
  const [state, send] = useMachine(placeMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => PlatformFetcher.FindMany(state.context.searchPayload),
    queryKey: ['platformList', state.context.searchPayload],
  });

  const createPlatform = useMutation({
    mutationFn: (payload: FPlatform) => PlatformFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updatePlatform = useMutation({
    mutationFn: ({ payload, id }: { id: VPlatform['id']; payload: FPlatform }) => PlatformFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deletePlatform = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return PlatformFetcher.Delete(id);
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

  const onItemUpdate = (platform: FPlatform, id: VPlatform['id']): void => {
    updatePlatform.mutate({ id, payload: platform });
  };

  const onItemDelete = (id: VPlatform['id']): void => {
    deletePlatform.mutate(id);
  };

  const onCreateSubmit = (data: FPlatform) => {
    createPlatform.mutate(data);
  };

  const tableData: VPlatformTable[] = data
    ? data.data.map((item) => PlatformTransformer.VTPlatformTransformer(item))
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
