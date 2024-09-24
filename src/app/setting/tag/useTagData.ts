import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { TagFetcher } from '@/fetcher';
import { tagMachine } from '@/machines';
import { TagTransformer } from '@/transformer';
import { FTag, Id, VTag, VTagTable } from '@/types';

export default function useTagData() {
  const [state, send] = useMachine(tagMachine, {});

  const { data, isPending, refetch } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => TagFetcher.FindMany(state.context.searchPayload),
    queryKey: ['tagList', state.context.searchPayload],
  });

  const createTag = useMutation({
    mutationFn: (payload: FTag) => TagFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateTag = useMutation({
    mutationFn: ({ payload, id }: { id: VTag['id']; payload: FTag }) => TagFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteTag = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return TagFetcher.Delete(id);
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

  const onItemUpdate = (tag: FTag, id: VTag['id']): void => {
    updateTag.mutate({ id, payload: tag });
  };

  const onItemDelete = (id: VTag['id']): void => {
    deleteTag.mutate(id);
  };

  const onCreateSubmit = (data: FTag) => {
    createTag.mutate(data);
  };

  const tableData: VTagTable[] = data ? data.data.map((item) => TagTransformer.VTTagTransformer(item)) : [];

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
