import { assign, setup } from 'xstate';

import { FBrand, Id, NType } from '@/types';

type MachineContext = {
  waitTime: number;
};

const INITIAL_CONTEXT: MachineContext = {
  waitTime: 0,
};

type MachineEvents = { type: 'TO_YELLOW' } | { time: number; type: 'TO_RED' } | { time: number; type: 'TO_GREEN' };

export const trafficLightMachine = setup({
  actions: {
    resetTime: assign(INITIAL_CONTEXT),
  },
  types: {
    context: {} as MachineContext,
    events: {} as MachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'traffic light',
  initial: 'GREEN',
  states: {
    GREEN: {
      on: {
        TO_YELLOW: { target: 'YELLOW' },
      },
    },
    RED: {
      on: {
        TO_GREEN: {
          actions: assign({
            waitTime: ({ context, event }) => event.time,
          }),
          target: 'GREEN',
        },
      },
    },
    YELLOW: {
      on: {
        TO_RED: {
          actions: assign({
            waitTime: ({ context, event }) => event.time,
          }),
          target: 'RED',
        },
      },
    },
  },
});
