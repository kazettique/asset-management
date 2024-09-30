'use client';

import BasicIcon from '@/components/BasicIcon';
import Table, { ColumnProps } from '@/components/Table';
import { SettingTransformer } from '@/transformer';
import { VSettingTable } from '@/types';

import SettingModifier from './SettingModifier';
import useSettingData from './useSettingData';

export default function Page() {
  const { data, isPending, onItemUpdate, refetch, send, state, tableData } = useSettingData();

  const columns: ColumnProps<VSettingTable>[] = [
    {
      key: 'key',
      title: 'key',
    },
    {
      key: 'value',
      render: (column, item) =>
        typeof item.value === 'object' ? (
          <div>{JSON.stringify(item.value, null, 2)}</div>
        ) : (
          <div>{String(item.value)}</div>
        ),
      title: 'value',
    },
    {
      key: 'action',
      render: (column, item) => (
        <BasicIcon
          className="bg-slate-500 shadow-slate-500/20 hover:shadow-slate-500/40 p-2 rounded-md text-white cursor-pointer"
          iconType="pen-to-square-solid"
          onClick={() =>
            void send({
              formValues: SettingTransformer.VFSettingTransformer(item.raw),
              id: item.raw.id,
              type: 'TO_EDIT',
            })
          }
        />
      ),
      title: 'Action',
    },
  ];

  return (
    <div className="p-4 relative overflow-y-auto h-full flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Settings</h2>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        <Table
          className="grow overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg relative"
          data={tableData}
          columns={columns}
          isLoading={isPending}
        />
      </div>

      <SettingModifier
        isOpen={state.matches('EDIT')}
        onClose={() => send({ type: 'TO_MAIN' })}
        mode={state.matches('EDIT') ? 'edit' : undefined}
        onUpdate={(data, id) => {
          onItemUpdate(data, id);
          send({ type: 'TO_MAIN' });
        }}
        onCreate={(data) => void send({ type: 'TO_MAIN' })}
        onDelete={(id) => void send({ type: 'TO_MAIN' })}
        defaultValues={state.context.modifier.formValues}
        id={state.context.modifier.id}
      />
    </div>
  );
}
