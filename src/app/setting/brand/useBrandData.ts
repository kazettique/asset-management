import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { BrandFetcher } from '@/fetcher';
import { brandMachine } from '@/machines';
import { BrandTransformer } from '@/transformer';
import { FBrand, Id, VBrand, VBrandTable } from '@/types';

export default function useBrandData() {
  const [state, send] = useMachine(brandMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => BrandFetcher.FindMany(state.context.searchPayload),
    queryKey: ['brandList', state.context.searchPayload],
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

  const onItemUpdate = (brand: FBrand, id: VBrand['id']): void => {
    updateBrand.mutate({ id, payload: brand });
  };

  const onItemDelete = (id: VBrand['id']): void => {
    deleteBrand.mutate(id);
  };

  const onCreateSubmit = (data: FBrand) => {
    createBrand.mutate(data);
  };

  const tableData: VBrandTable[] = data ? data.data.map((item) => BrandTransformer.VTBrandTransformer(item)) : [];

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
