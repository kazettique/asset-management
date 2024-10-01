'use client';

import BasicButton from '@/components/BasicButton';
import BasicIcon from '@/components/BasicIcon';
import Pagination from '@/components/Pagination';
import Table, { ColumnProps } from '@/components/Table';
import { AssetTransformer } from '@/transformer';
import { VAssetTable } from '@/types';

import AssetImport from './AssetImport';
import AssetModifier from './AssetModifier';
import AssetSearchBar from './AssetSearchBar';
import useAssetData from './useAssetData';

export default function Page() {
  const {
    settingOptions,
    assetData,
    tableData,
    onItemUpdate,
    onCreateSubmit,
    onItemDelete,
    assetRefetch,
    state,
    send,
    assetIsPending,
    currencyOptions,
  } = useAssetData();

  const columns: ColumnProps<VAssetTable>[] = [
    {
      key: 'name',
      render: (column, item) => <div className="w-[200px] whitespace-pre-wrap">{item.name}</div>,
      title: 'Name',
    },
    {
      key: 'category',
      title: 'Category',
    },
    {
      key: 'brand',
      title: 'Brand',
    },
    {
      className: 'whitespace-nowrap',
      key: 'startInfo',
      render: (column, item) => (
        <div className="flex gap-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <BasicIcon
                iconType="calendar-days-solid"
                className="text-xs flex items-center justify-center rounded-sm bg-blue-100 dark:bg-blue-900 p-1 w-5"
              />
              <div>{item.startInfo.startDate}</div>
            </div>
            <div className="flex items-center gap-1">
              <BasicIcon
                iconType="dollar-sign-solid"
                className="text-xs flex items-center justify-center rounded-sm bg-blue-100 dark:bg-blue-900 p-1 w-5"
              />
              <div>{item.startInfo.startPrice}</div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <BasicIcon
                iconType="hammer-solid"
                className="text-xs flex items-center justify-center rounded-sm bg-blue-100 dark:bg-blue-900 p-1 w-5"
              />
              <div>{item.startInfo.startMethod}</div>
            </div>
            <div className="flex items-center gap-1">
              <BasicIcon
                iconType="desktop-solid"
                className="text-xs flex items-center justify-center rounded-sm bg-blue-100 dark:bg-blue-900 p-1 w-5"
              />
              <div>{item.startInfo.startPlatform}</div>
            </div>
          </div>
        </div>
      ),
      title: 'Start Info',
    },
    {
      className: 'whitespace-nowrap',
      key: 'endInfo',
      render: (column, item) => (
        <div className="flex gap-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <BasicIcon
                iconType="calendar-days-solid"
                className="text-xs flex items-center justify-center rounded-sm bg-blue-100 dark:bg-blue-900 p-1 w-5"
              />
              <div>{item.endInfo.endDate}</div>
            </div>
            <div className="flex items-center gap-1">
              <BasicIcon
                iconType="dollar-sign-solid"
                className="text-xs flex items-center justify-center rounded-sm bg-blue-100 dark:bg-blue-900 p-1 w-5"
              />
              <div>{item.endInfo.endPrice}</div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <BasicIcon
                iconType="hammer-solid"
                className="text-xs flex items-center justify-center rounded-sm bg-blue-100 dark:bg-blue-900 p-1 w-5"
              />
              <div>{item.endInfo.endMethod}</div>
            </div>
            <div className="flex items-center gap-1">
              <BasicIcon
                iconType="desktop-solid"
                className="text-xs flex items-center justify-center rounded-sm bg-blue-100 dark:bg-blue-900 p-1 w-5"
              />
              <div>{item.endInfo.endPlatform}</div>
            </div>
          </div>
        </div>
      ),
      title: 'End Info',
    },
    {
      key: 'priceDifference',
      title: 'Price Diff',
    },
    {
      key: 'usageTime',
      title: 'Usage Time',
    },
    {
      key: 'monthlyCost',
      title: 'monthlyCost',
    },
    {
      key: 'owner',
      title: 'owner',
    },
    {
      key: 'meta',
      render: (column, item) => (
        <>
          {item.meta.map((_item, index) => {
            const { key, value } = _item;
            return (
              <div key={index}>
                {key}: {value}
              </div>
            );
          })}
        </>
      ),
      title: 'Meta',
    },
    {
      key: 'tags',
      render: (column, item) => (
        <div>
          {item.tags.map((_item, _index) => (
            <div key={_index}>
              <span>#</span>
              <span>{_item}</span>
            </div>
          ))}
        </div>
      ),
      title: 'tags',
    },
    {
      key: 'comment',
      render: (column, item) => <div className="w-[100px] whitespace-pre-wrap">{item.comment}</div>,
      title: 'Comment',
    },
    {
      key: 'action',
      render: (column, item) => (
        <BasicIcon
          className="bg-slate-500 shadow-slate-500/20 hover:shadow-slate-500/40 p-2 rounded-md text-white cursor-pointer"
          iconType="pen-to-square-solid"
          onClick={() =>
            void send({
              formValues: AssetTransformer.VFAssetTransformer(item.raw, settingOptions, currencyOptions),
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
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-3 min-w-[160px]">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Assets</h2>

          <div className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            <span>{assetData ? assetData.totalCount : 0}</span>
            <span>&nbsp;assets</span>
          </div>
        </div>

        <div className="flex items-center gap-x-3 w-full overflow-hidden">
          <AssetSearchBar
            className="grow mx-2 px-2 py-2"
            settingOptions={settingOptions}
            onUpdatePrimaryFilter={(payload) => void send({ payload, type: 'UPDATE_SEARCH_PRIMARY_FILTER' })}
            onUpdateSecondaryFilter={(payload) => void send({ payload, type: 'UPDATE_SEARCH_SECONDARY_FILTER' })}
            onResetSearchCondition={() => void send({ type: 'RESET_SEARCH_CONDITION' })}
          />

          <BasicButton variant="secondary" onClick={() => send({ type: 'TO_IMPORT' })} className="flex gap-x-2">
            <BasicIcon iconType="file-import-solid" />
            <span>Import</span>
          </BasicButton>

          <BasicButton onClick={() => send({ type: 'TO_CREATE' })} className="flex gap-x-2">
            <BasicIcon iconType="cross" />
            <span>Create</span>
          </BasicButton>
        </div>
      </div>

      <div className="flex flex-col mt-2 w-full overflow-auto relative grow">
        <Table
          data={tableData}
          columns={columns}
          className="grow overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg relative"
          isLoading={assetIsPending}
        />
        {assetData && state.context.searchPayload.page && (
          <Pagination
            page={state.context.searchPayload.page}
            totalPage={assetData.totalPage}
            onNext={() => void send({ type: 'NEXT_PAGE' })}
            onPrev={() => void send({ type: 'PREV_PAGE' })}
            onFirst={() => void send({ payload: 1, type: 'JUMP_PAGE' })}
            onLast={() => void send({ payload: assetData.totalPage, type: 'JUMP_PAGE' })}
          />
        )}
      </div>

      <AssetModifier
        isOpen={state.matches('EDIT') || state.matches('CREATE')}
        onClose={() => void send({ type: 'TO_MAIN' })}
        mode={state.matches('EDIT') ? 'edit' : state.matches('CREATE') ? 'create' : undefined}
        onUpdate={(data, id) => {
          onItemUpdate(data, id);
          send({ type: 'TO_MAIN' });
        }}
        onCreate={(data) => {
          onCreateSubmit(data);
          send({ type: 'TO_MAIN' });
        }}
        onDelete={(id) => {
          onItemDelete(id);
          send({ type: 'TO_MAIN' });
        }}
        settingOptions={settingOptions}
        currencyOptions={currencyOptions}
        modifierContext={state.context.modifier}
      />

      <AssetImport
        isOpen={state.matches('IMPORT')}
        onClose={() => void send({ type: 'TO_MAIN' })}
        onDone={() => {
          void send({ type: 'TO_MAIN' });
          assetRefetch();
        }}
        onImport={(payload) => void send({ payload, type: 'IMPORT_TASK_TO_QUEUE' })}
        settingOptions={settingOptions}
        currencyOptions={currencyOptions}
        state={
          state.matches({ IMPORT: 'PREPARE' })
            ? 'PREPARE'
            : state.matches({ IMPORT: 'PROCESSING' })
              ? 'PROCESSING'
              : 'FINISH'
        }
        importContext={state.context.import}
      />
    </div>
  );
}
