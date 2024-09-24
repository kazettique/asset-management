import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { QuoteFetcher } from '@/fetcher';
import { quoteMachine } from '@/machines';
import { QuoteTransformer } from '@/transformer';
import { FQuote, Id, VQuote, VQuoteTable } from '@/types';

export default function useQuoteData() {
  const [state, send] = useMachine(quoteMachine, {});

  const { data, isPending, refetch } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => QuoteFetcher.FindMany(state.context.searchPayload),
    queryKey: ['quoteList', state.context.searchPayload],
  });

  const createQuote = useMutation({
    mutationFn: (payload: FQuote) => QuoteFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updateQuote = useMutation({
    mutationFn: ({ payload, id }: { id: VQuote['id']; payload: FQuote }) => QuoteFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteQuote = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return QuoteFetcher.Delete(id);
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

  const onItemUpdate = (quote: FQuote, id: VQuote['id']): void => {
    updateQuote.mutate({ id, payload: quote });
  };

  const onItemDelete = (id: VQuote['id']): void => {
    deleteQuote.mutate(id);
  };

  const onCreateSubmit = (data: FQuote) => {
    createQuote.mutate(data);
  };

  const tableData: VQuoteTable[] = data ? data.data.map((item) => QuoteTransformer.VTQuoteTransformer(item)) : [];

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
