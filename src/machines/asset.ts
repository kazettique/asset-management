import { assign, setup } from 'xstate';

import { FAsset, Id, NType } from '@/types';

type MachineContext = {
  formValues: NType<FAsset>;
  id: NType<Id>;
};

type MachineEvents =
  | { type: 'TO_CREATE' }
  | { formValues: FAsset; id: Id; type: 'TO_EDIT' }
  | { type: 'TO_MAIN' }
  | { type: 'TO_IMPORT' };

export const assetMachine = setup({
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
  description: 'asset setting page',
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
    IMPORT: {
      on: {
        TO_MAIN: { target: 'MAIN' },
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
        TO_IMPORT: { target: 'IMPORT' },
      },
    },
  },
});
