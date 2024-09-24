import dayjs, { Dayjs } from 'dayjs';
import { assign, setup } from 'xstate';

type DashboardMachineContext = {
  currentDate: Dayjs;
};

type DashboardMachineEvents = { type: 'NEXT_MONTH' } | { type: 'PREV_MONTH' } | { payload: Dayjs; type: 'JUMP_DATE' };

const INITIAL_CONTEXT: DashboardMachineContext = {
  currentDate: dayjs(),
};

export const dashboardMachine = setup({
  actions: {
    JUMP_DATE: assign({
      currentDate: ({ context }, params: { payload: Dayjs }) => params.payload,
    }),
    NEXT_MONTH: assign({
      currentDate: ({ context }) => context.currentDate.add(1, 'month'),
    }),
    PREV_MONTH: assign({
      currentDate: ({ context }) => context.currentDate.subtract(1, 'month'),
    }),
    RESET_CONTEXT: assign(INITIAL_CONTEXT),
  },
  types: {
    context: {} as DashboardMachineContext,
    events: {} as DashboardMachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'dashboard page',
  initial: 'MAIN',
  states: {
    MAIN: {
      on: {
        JUMP_DATE: {
          actions: {
            params: ({ context, event }) => ({ payload: event.payload }),
            type: 'JUMP_DATE',
          },
        },
        NEXT_MONTH: {
          actions: { type: 'NEXT_MONTH' },
        },
        PREV_MONTH: {
          actions: { type: 'PREV_MONTH' },
        },
      },
    },
  },
});
