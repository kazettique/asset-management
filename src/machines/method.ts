import { assign, setup } from 'xstate';

import { FMethod, Id, NType } from '@/types';

type MachineContext = {
  formValues: NType<FMethod>;
  id: NType<Id>;
};

type MachineEvents = { type: 'TO_CREATE' } | { formValues: FMethod; id: Id; type: 'TO_EDIT' } | { type: 'TO_MAIN' };

export const methodMachine = setup({
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
  description: 'method setting page',
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
