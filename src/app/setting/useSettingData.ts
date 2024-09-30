import { useMutation, useQuery } from '@tanstack/react-query';
import { useMachine } from '@xstate/react';

import { SettingFetcher } from '@/fetcher';
import { settingMachine } from '@/machines';
import { SettingTransformer } from '@/transformer';
import { FSetting, VSetting, VSettingTable } from '@/types';

export default function useSettingData() {
  const [state, send] = useMachine(settingMachine, {});

  const { data, isPending, refetch } = useQuery({
    queryFn: () => SettingFetcher.FindAll(),
    queryKey: ['setting'],
  });

  const updateSetting = useMutation({
    mutationFn: ({ payload, id }: { id: VSetting['id']; payload: FSetting }) => SettingFetcher.Update(payload, id),
    onSuccess: () => {
      refetch();
    },
  });

  const onItemUpdate = (Setting: FSetting, id: VSetting['id']): void => {
    updateSetting.mutate({ id, payload: Setting });
  };

  const tableData: VSettingTable[] = data ? data.data.map((item) => SettingTransformer.VTSettingTransformer(item)) : [];

  return {
    data,
    isPending,
    onItemUpdate,
    refetch,
    send,
    state,
    tableData,
  };
}
