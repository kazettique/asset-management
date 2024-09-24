import { v4 as uuidv4 } from 'uuid';
import { assign, fromPromise, setup } from 'xstate';

import { AssetTransformer } from '@/transformer';
import { FAsset, FAssetImport, Id, NNumber, NType, PAsset, VAssetImportItem } from '@/types';
import { Utils } from '@/utils';

export enum TaskStatus {
  DONE = 'DONE',
  FAILED = 'FAILED',
  PROCESSING = 'PROCESSING',
  QUEUE = 'QUEUED',
}

function waitForTimeout() {
  const minTimeout = 10;
  const maxTimeout = 30;
  const ms = Math.floor(Math.random() * (maxTimeout - minTimeout) + minTimeout);

  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Task {
  id: number;
  name: string;
  // priority: number;
  status: TaskStatus;
  // taskType: TaskType;
  // timestamp: number;
}

async function taskAsPromise() {
  await waitForTimeout();

  const shouldThrow = Math.random() < 0.5;
  if (shouldThrow) {
    throw new Error('PROCESSING failed');
  }
}

type ImportPayload = {
  // id: number;
  name: string;
};

export type MachineContext = {
  currentTaskId: NNumber;
  queue: number[];
  tasks: Record<number, Task>;
};

type MachineEvents =
  | { id: number; type: 'UPDATE_TASKS_PRIORITY' }
  | { payload: ImportPayload[]; type: 'IMPORT_TASK_TO_QUEUE' };

const INITIAL_CONTEXT: MachineContext = {
  currentTaskId: null,
  queue: [],
  tasks: {},
};

export const IMPORT_PAYLOAD: ImportPayload[] = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
  { name: 'd' },
  { name: 'e' },
];

// ref: https://github.com/Devessier/xstate-task-queue/tree/main
// note: the example is very impressive!!
export const taskQueueMachine = setup({
  actions: {
    CHANGE_CURRENT_TASK_STATUS: assign({
      tasks: ({ context }, params: { status: TaskStatus }) => {
        const { currentTaskId, tasks } = context;

        if (currentTaskId === null) {
          throw new Error('Can not run this action without a defined currentTaskId');
        }

        return {
          ...tasks,
          [currentTaskId]: { ...tasks[currentTaskId], status: params.status },
        };
      },
    }),
    IMPORT_TASK_TO_QUEUE: assign(({ context }, params: { payload: ImportPayload[] }) => {
      const { payload } = params;

      const _tasks = payload.reduce<MachineContext['tasks']>((acc, curr, _index, _arr) => {
        const _id = uuidv4();
        return {
          ...acc,
          [_id]: {
            id: _id,
            name: curr.name,
            status: TaskStatus.QUEUE,
          },
        };
      }, {});

      return {
        ...context,
        queue: Object.values(_tasks).map((item) => item.id),
        tasks: _tasks,
      };
    }),
    RESET_CURRENT_TASK: assign({
      currentTaskId: ({ context }) => null,
    }),
    TAKE_TASK_FROM_QUEUE: assign({
      currentTaskId: ({ context }) => context.queue[0],
      queue: ({ context }) => context.queue.slice(1),
    }),
  },
  actors: {
    PROCESS_TASK: fromPromise<any, MachineContext>(async (payload) => {
      const { tasks, currentTaskId } = payload.input;
      if (currentTaskId === undefined) {
        throw new Error('currentTaskId must be defined');
      }

      await Utils.WaitTimer(200);
      return await taskAsPromise();
    }),
  },
  guards: {
    AVAILABLE_FOR_PROCESS: ({ context }) => context.queue.length > 0,
    SHOULD_FINISH_QUEUE: ({ context }) => context.queue.length === 0,
  },
  types: {
    context: {} as MachineContext,
    events: {} as MachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  id: 'test',
  initial: 'IMPORT',
  states: {
    FINISH: {
      type: 'final',
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
    IMPORT: {
      on: {
        IMPORT_TASK_TO_QUEUE: {
          actions: {
            params: ({ context, event }) => ({ payload: event.payload }),
            type: 'IMPORT_TASK_TO_QUEUE',
          },
          target: 'IDLE',
        },
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
});
