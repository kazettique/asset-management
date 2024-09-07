import { assign, setup } from 'xstate';

import { FCategory, Id, NType } from '@/types';

type MachineEvents = { type: 'TO_CREATE' } | { formValues: FCategory; id: Id; type: 'TO_EDIT' } | { type: 'TO_MAIN' };

const machine = setup({
  actions: {
    // TO_EDIT: assign({
    //   formValues: ({ context }) => context.formValues,
    //   id: ({ context }) => context.id,
    // }),
  },
  types: {
    context: {} as {
      formValues: NType<FCategory>;
      id: NType<Id>;
    },
    events: {} as MachineEvents,
  },
}).createMachine({
  context: {
    formValues: null,
    id: null,
  },
  initial: 'MAIN',
  states: {
    CREATE: {
      on: {
        TO_MAIN: {
          actions: assign({
            formValues: ({ context, event }) => event.value,
          }),
          target: 'MAIN',
        },
      },
    },
    EDIT: {
      on: {
        TO_MAIN: { target: 'MAIN' },
      },
    },
    MAIN: {
      on: {
        TO_CREATE: { target: 'CREATE' },
        TO_EDIT: { target: 'EDIT' },
      },
    },
  },
});
