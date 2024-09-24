import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { PlaceFetcher } from '@/fetcher';
import { placeMachine } from '@/machines/place';
import { PlaceTransformer } from '@/transformer';
import { FPlace, Id, VPlace, VPlaceTable } from '@/types';

export default function usePlaceData() {
  const [state, send] = useMachine(placeMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => PlaceFetcher.FindMany(state.context.searchPayload),
    queryKey: ['placeList', state.context.searchPayload],
  });

  const createPlace = useMutation({
    mutationFn: (payload: FPlace) => PlaceFetcher.Create(payload),
    onSuccess: () => {
      refetch();
    },
  });

  const updatePlace = useMutation({
    mutationFn: ({ payload, id }: { id: VPlace['id']; payload: FPlace }) => PlaceFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const deletePlace = useMutation({
    mutationFn: (id: Id) => {
      if (confirm('Confirm delete?')) {
        return PlaceFetcher.Delete(id);
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

  const onItemUpdate = (place: FPlace, id: VPlace['id']): void => {
    updatePlace.mutate({ id, payload: place });
  };

  const onItemDelete = (id: VPlace['id']): void => {
    deletePlace.mutate(id);
  };

  const onCreateSubmit = (data: FPlace) => {
    createPlace.mutate(data);
  };

  const tableData: VPlaceTable[] = data ? data.data.map((item) => PlaceTransformer.VTPlaceTransformer(item)) : [];

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
