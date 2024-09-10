import { v4 as uuidv4 } from 'uuid';
import { assign, fromPromise, setup } from 'xstate';

import { AssetFetcher } from '@/fetcher';
import { FAsset, Id, NNumber, NType, PAsset } from '@/types';
import { Utils } from '@/utils';

export enum TaskStatus {
  DONE = 'DONE',
  FAILED = 'FAILED',
  PROCESSING = 'PROCESSING',
  QUEUE = 'QUEUED',
}

export interface Task {
  id: number;
  name: string;
  payload: PAsset;
  status: TaskStatus;
}

export type MachineContext = {
  import: {
    currentTaskId: NNumber;
    queue: number[];
    tasks: Record<number, Task>;
  };
  modifier: {
    formValues: NType<FAsset>;
    id: NType<Id>;
  };
};

type MachineEvents =
  | { type: 'TO_CREATE' }
  | { formValues: FAsset; id: Id; type: 'TO_EDIT' }
  | { type: 'TO_MAIN' }
  | { type: 'TO_IMPORT' }
  | { id: number; type: 'UPDATE_TASKS_PRIORITY' }
  | { payload: PAsset[]; type: 'IMPORT_TASK_TO_QUEUE' };

const INITIAL_CONTEXT: MachineContext = {
  import: { currentTaskId: null, queue: [], tasks: {} },
  modifier: { formValues: null, id: null },
};

export const assetMachine = setup({
  actions: {
    CHANGE_CURRENT_TASK_STATUS: assign({
      import: ({ context }, params: { status: TaskStatus }) => {
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

        const _tasks = payload.reduce<MachineContext['import']['tasks']>((acc, curr, _index, _arr) => {
          const _id = uuidv4();
          return {
            ...acc,
            [_id]: { id: _id, name: curr.name, payload: curr, status: TaskStatus.QUEUE },
          };
        }, {});

        return {
          ...context.import,
          queue: Object.values(_tasks).map((item) => item.id),
          tasks: _tasks,
        };
      },
    }),
    RESET_CONTEXT: assign(INITIAL_CONTEXT),
    RESET_CURRENT_TASK: assign({
      import: ({ context }) => ({ ...context.import, currentTaskId: null }),
    }),
    TAKE_TASK_FROM_QUEUE: assign({
      import: ({ context }) => ({
        ...context.import,
        currentTaskId: context.import.queue[0],
        queue: context.import.queue.slice(1),
      }),
    }),
  },
  actors: {
    PROCESS_TASK: fromPromise<any, MachineContext>(async (payload) => {
      const { tasks, currentTaskId } = payload.input.import;
      if (currentTaskId === null) {
        throw new Error('currentTaskId must be defined');
      }

      const currentTask = tasks[currentTaskId];

      await Utils.WaitTimer(200);
      return await AssetFetcher.Create(currentTask.payload);
    }),
  },
  guards: {
    AVAILABLE_FOR_PROCESS: ({ context }) => context.import.queue.length > 0,
    SHOULD_FINISH_QUEUE: ({ context }) => context.import.queue.length === 0,
  },
  types: {
    context: {} as MachineContext,
    events: {} as MachineEvents,
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
          entry: [{ params: { status: TaskStatus.PROCESSING }, type: 'CHANGE_CURRENT_TASK_STATUS' }],
          invoke: {
            input: ({ context }) => context,
            onDone: {
              actions: [
                { params: { status: TaskStatus.DONE }, type: 'CHANGE_CURRENT_TASK_STATUS' },
                { type: 'RESET_CURRENT_TASK' },
              ],
              target: 'IDLE',
            },
            onError: {
              actions: [
                { params: { status: TaskStatus.FAILED }, type: 'CHANGE_CURRENT_TASK_STATUS' },
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
        TO_CREATE: { target: 'CREATE' },
        TO_EDIT: {
          actions: assign({
            modifier: ({ context, event }) => ({ formValues: event.formValues, id: event.id }),
          }),
          target: 'EDIT',
        },
        TO_IMPORT: { target: 'IMPORT' },
      },
    },
  },
});
