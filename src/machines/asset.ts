import { v4 as uuidv4 } from 'uuid';
import { assign, fromPromise, setup } from 'xstate';

import { AssetConstant } from '@/constant';
import { AssetFetcher } from '@/fetcher';
import { AssetTransformer } from '@/transformer';
import {
  FAsset,
  FAssetFindPrimaryFilter,
  FAssetFindSecondaryFilter,
  FAssetFindSort,
  Id,
  ImportTask,
  ImportTaskStatus,
  NNumber,
  NType,
  PAsset,
  PAssetFind,
} from '@/types';

export type AssetMachineContext = {
  import: {
    currentTaskId: NNumber;
    queue: number[];
    tasks: Record<number, ImportTask<PAsset>>;
  };
  modifier: {
    formValues: NType<FAsset>;
    id: NType<Id>;
  };
  searchPayload: PAssetFind;
};

type AssetMachineEvents =
  | { type: 'TO_CREATE' }
  | { formValues: FAsset; id: Id; type: 'TO_EDIT' }
  | { type: 'TO_MAIN' }
  | { type: 'TO_IMPORT' }
  | { payload: PAsset[]; type: 'IMPORT_TASK_TO_QUEUE' }
  | { payload: FAssetFindPrimaryFilter; type: 'UPDATE_SEARCH_PRIMARY_FILTER' }
  | { payload: FAssetFindSecondaryFilter; type: 'UPDATE_SEARCH_SECONDARY_FILTER' }
  | { payload: FAssetFindSort; type: 'UPDATE_SEARCH_SORT' }
  | { type: 'RESET_SEARCH_CONDITION' }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { payload: number; type: 'JUMP_PAGE' };

const INITIAL_CONTEXT: AssetMachineContext = {
  import: { currentTaskId: null, queue: [], tasks: {} },
  modifier: { formValues: null, id: null },
  searchPayload: AssetConstant.P_ASSET_FIND_DEFAULT,
};

export const assetMachine = setup({
  actions: {
    CHANGE_CURRENT_TASK_STATUS: assign({
      import: ({ context }, params: { status: ImportTaskStatus }) => {
        const { currentTaskId, tasks } = context.import;

        if (currentTaskId === null) {
          throw new Error('Can not run this action without a defined currentTaskId');
        }

        return {
          ...context.import,
          tasks: {
            ...tasks,
            [currentTaskId]: { ...tasks[currentTaskId], status: params.status },
          },
        };
      },
    }),
    IMPORT_TASK_TO_QUEUE: assign({
      import: ({ context }, params: { payload: PAsset[] }) => {
        const { payload } = params;

        const _tasks = payload.reduce<AssetMachineContext['import']['tasks']>((acc, curr, _index, _arr) => {
          const _id = uuidv4();
          return {
            ...acc,
            [_id]: { id: _id, name: curr.name, payload: curr, status: ImportTaskStatus.QUEUE },
          };
        }, {});

        return {
          ...context.import,
          queue: Object.values(_tasks).map((item) => item.id),
          tasks: _tasks,
        };
      },
    }),
    JUMP_PAGE: assign({
      searchPayload: ({ context }, params: { payload: number }) => {
        return {
          ...context.searchPayload,
          page: params.payload,
        };
      },
    }),
    NEXT_PAGE: assign({
      searchPayload: ({ context }) => {
        return {
          ...context.searchPayload,
          page: context.searchPayload.page ? context.searchPayload.page + 1 : context.searchPayload.page,
        };
      },
    }),
    PREV_PAGE: assign({
      searchPayload: ({ context }) => {
        return {
          ...context.searchPayload,
          page: context.searchPayload.page ? context.searchPayload.page - 1 : context.searchPayload.page,
        };
      },
    }),
    RESET_CONTEXT: assign(INITIAL_CONTEXT),
    RESET_CURRENT_TASK: assign({
      import: ({ context }) => ({ ...context.import, currentTaskId: null }),
    }),
    RESET_SEARCH_CONDITION: assign({
      searchPayload: ({ context }) => AssetConstant.P_ASSET_FIND_DEFAULT,
    }),
    TAKE_TASK_FROM_QUEUE: assign({
      import: ({ context }) => ({
        ...context.import,
        currentTaskId: context.import.queue[0],
        queue: context.import.queue.slice(1),
      }),
    }),
    UPDATE_SEARCH_PRIMARY_FILTER: assign({
      searchPayload: ({ context }, params: { payload: FAssetFindPrimaryFilter }) => {
        const transformedPayload = AssetTransformer.FPAssetFindPrimaryFilterTransformer(params.payload);

        return {
          ...AssetConstant.P_ASSET_FIND_DEFAULT,
          filters: { ...context.searchPayload.filters, ...transformedPayload },
        };
      },
    }),
    UPDATE_SEARCH_SECONDARY_FILTER: assign({
      searchPayload: ({ context }, params: { payload: FAssetFindSecondaryFilter }) => {
        const transformedPayload = AssetTransformer.FPAssetFindSecondaryFilterTransformer(params.payload);
        return {
          ...AssetConstant.P_ASSET_FIND_DEFAULT,
          filters: { ...context.searchPayload.filters, ...transformedPayload },
        };
      },
    }),
    UPDATE_SEARCH_SORT: assign({
      searchPayload: ({ context }, params: { payload: FAssetFindSort }) => {
        return { ...AssetConstant.P_ASSET_FIND_DEFAULT, sort: params.payload };
      },
    }),
  },
  actors: {
    PROCESS_TASK: fromPromise<any, AssetMachineContext>(async (payload) => {
      const { tasks, currentTaskId } = payload.input.import;
      if (currentTaskId === null) {
        throw new Error('currentTaskId must be defined');
      }

      const currentTask = tasks[currentTaskId];

      // await Utils.WaitTimer(100);
      return await AssetFetcher.Create(currentTask.payload);
    }),
  },
  guards: {
    AVAILABLE_FOR_PROCESS: ({ context }) => context.import.queue.length > 0,
    SHOULD_FINISH_QUEUE: ({ context }) => context.import.queue.length === 0,
  },
  types: {
    context: {} as AssetMachineContext,
    events: {} as AssetMachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'asset setting page',
  id: 'Page',
  initial: 'MAIN',
  states: {
    CREATE: {
      on: {
        TO_MAIN: { actions: ['RESET_CONTEXT'], target: 'MAIN' },
      },
    },
    EDIT: {
      on: {
        TO_MAIN: { actions: ['RESET_CONTEXT'], target: 'MAIN' },
      },
    },
    IMPORT: {
      id: 'Import',
      initial: 'PREPARE',
      states: {
        FINISH: {
          on: {
            TO_MAIN: { target: '#Page.MAIN' },
          },
        },
        IDLE: {
          always: [
            {
              actions: [{ type: 'TAKE_TASK_FROM_QUEUE' }],
              guard: 'AVAILABLE_FOR_PROCESS',
              target: 'PROCESSING',
            },
            {
              guard: 'SHOULD_FINISH_QUEUE',
              target: 'FINISH',
            },
          ],
        },
        PREPARE: {
          on: {
            IMPORT_TASK_TO_QUEUE: {
              actions: {
                params: ({ context, event }) => ({ payload: event.payload }),
                type: 'IMPORT_TASK_TO_QUEUE',
              },
              target: 'IDLE',
            },
            TO_MAIN: { target: '#Page.MAIN' },
          },
        },
        PROCESSING: {
          entry: [{ params: { status: ImportTaskStatus.PROCESSING }, type: 'CHANGE_CURRENT_TASK_STATUS' }],
          invoke: {
            input: ({ context }) => context,
            onDone: {
              actions: [
                { params: { status: ImportTaskStatus.DONE }, type: 'CHANGE_CURRENT_TASK_STATUS' },
                { type: 'RESET_CURRENT_TASK' },
              ],
              target: 'IDLE',
            },
            onError: {
              actions: [
                { params: { status: ImportTaskStatus.FAILED }, type: 'CHANGE_CURRENT_TASK_STATUS' },
                { type: 'RESET_CURRENT_TASK' },
              ],
              target: 'IDLE',
            },
            src: 'PROCESS_TASK',
          },
        },
      },
    },
    MAIN: {
      on: {
        JUMP_PAGE: {
          actions: {
            params: ({ context, event }) => ({ payload: event.payload }),
            type: 'JUMP_PAGE',
          },
        },
        NEXT_PAGE: {
          actions: { type: 'NEXT_PAGE' },
        },
        PREV_PAGE: {
          actions: { type: 'PREV_PAGE' },
        },
        RESET_SEARCH_CONDITION: {
          actions: {
            type: 'RESET_SEARCH_CONDITION',
          },
        },
        TO_CREATE: { target: 'CREATE' },
        TO_EDIT: {
          actions: assign({
            modifier: ({ context, event }) => ({ formValues: event.formValues, id: event.id }),
          }),
          target: 'EDIT',
        },
        TO_IMPORT: { target: 'IMPORT' },
        UPDATE_SEARCH_PRIMARY_FILTER: {
          actions: {
            params: ({ context, event }) => ({ payload: event.payload }),
            type: 'UPDATE_SEARCH_PRIMARY_FILTER',
          },
        },
        UPDATE_SEARCH_SECONDARY_FILTER: {
          actions: {
            params: ({ context, event }) => ({ payload: event.payload }),
            type: 'UPDATE_SEARCH_SECONDARY_FILTER',
          },
        },
        UPDATE_SEARCH_SORT: {
          actions: {
            params: ({ context, event }) => ({ payload: event.payload }),
            type: 'UPDATE_SEARCH_SORT',
          },
        },
      },
    },
  },
});
