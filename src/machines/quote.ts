import { v4 as uuidv4 } from 'uuid';
import { assign, fromPromise, setup } from 'xstate';

import { CommonConstant } from '@/constant';
import { QuoteFetcher } from '@/fetcher';
import { FQuote, Id, ImportTask, ImportTaskStatus, NNumber, NType, PFindPagination, PQuote } from '@/types';

export type QuoteMachineContext = {
  import: {
    currentTaskId: NNumber;
    queue: number[];
    tasks: Record<number, ImportTask<PQuote>>;
  };
  modifier: {
    formValues: NType<FQuote>;
    id: NType<Id>;
  };
  searchPayload: PFindPagination;
};

export type QuoteMachineEvents =
  | { type: 'TO_CREATE' }
  | { formValues: FQuote; id: Id; type: 'TO_EDIT' }
  | { type: 'TO_MAIN' }
  | { type: 'TO_IMPORT' }
  | { payload: PQuote[]; type: 'IMPORT_TASK_TO_QUEUE' }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { payload: number; type: 'JUMP_PAGE' };

const INITIAL_CONTEXT: QuoteMachineContext = {
  import: { currentTaskId: null, queue: [], tasks: {} },
  modifier: { formValues: null, id: null },
  searchPayload: CommonConstant.P_FIND_PAGINATION_DEFAULT,
};

export const quoteMachine = setup({
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
      import: ({ context }, params: { payload: PQuote[] }) => {
        const { payload } = params;

        const _tasks = payload.reduce<QuoteMachineContext['import']['tasks']>((acc, curr, _index, _arr) => {
          const _id = uuidv4();
          return {
            ...acc,
            [_id]: { id: _id, name: curr.author, payload: curr, status: ImportTaskStatus.QUEUE },
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
    TAKE_TASK_FROM_QUEUE: assign({
      import: ({ context }) => ({
        ...context.import,
        currentTaskId: context.import.queue[0],
        queue: context.import.queue.slice(1),
      }),
    }),
  },
  actors: {
    PROCESS_TASK: fromPromise<any, QuoteMachineContext>(async (payload) => {
      const { tasks, currentTaskId } = payload.input.import;
      if (currentTaskId === null) {
        throw new Error('currentTaskId must be defined');
      }

      const currentTask = tasks[currentTaskId];

      // await Utils.WaitTimer(100);
      return await QuoteFetcher.Create(currentTask.payload);
    }),
  },
  guards: {
    AVAILABLE_FOR_PROCESS: ({ context }) => context.import.queue.length > 0,
    SHOULD_FINISH_QUEUE: ({ context }) => context.import.queue.length === 0,
  },
  types: {
    context: {} as QuoteMachineContext,
    events: {} as QuoteMachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'quote setting page',
  id: 'Page',
  initial: 'MAIN',
  states: {
    CREATE: {
      on: {
        TO_MAIN: {
          actions: ['RESET_CONTEXT'],
          target: 'MAIN',
        },
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
