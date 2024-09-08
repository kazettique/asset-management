import { assign, setup } from 'xstate';

import { FPlatform, Id, NType } from '@/types';

type MachineContext = {
  formValues: NType<FPlatform>;
  id: NType<Id>;
};

type MachineEvents = { type: 'TO_CREATE' } | { formValues: FPlatform; id: Id; type: 'TO_EDIT' } | { type: 'TO_MAIN' };

export const platformMachine = setup({
  actions: {
    reset: assign({ formValues: null, id: null }),
  },
  types: {
    context: {} as MachineContext,
    events: {} as MachineEvents,
  },
}).createMachine({
  context: {
    formValues: null,
    id: null,
  },
  description: 'platform setting page',
  initial: 'MAIN',
  states: {
    CREATE: {
      on: {
        TO_MAIN: {
          actions: ['reset'],
          target: 'MAIN',
        },
      },
    },
    EDIT: {
      on: {
        TO_MAIN: { actions: ['reset'], target: 'MAIN' },
      },
    },
    MAIN: {
      on: {
        TO_CREATE: { target: 'CREATE' },
        TO_EDIT: {
          actions: assign({
            formValues: ({ context, event }) => event.formValues,
            id: ({ context, event }) => event.id,
          }),
          target: 'EDIT',
        },
      },
    },
  },
});
