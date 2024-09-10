import { assign, fromPromise, setup } from 'xstate';

import { FAsset, Id, NType, VAssetImportItem } from '@/types';

type MachineContext = {
  error: unknown;
  importItems: VAssetImportItem[];
};

type MachineEvents = { type: 'TO_SUBMITTING' } | { type: 'TO_PRE_SUBMIT' } | { type: 'TO_SUBMITTED' };

const INITIAL_CONTEXT: MachineContext = {
  error: undefined,
  importItems: [],
};

export const assetImportMachine = setup({
  actions: {
    reset: assign(INITIAL_CONTEXT),
    unHandleError: (_, _params: { message: string }) => {
      console.log('error!', _params.message);
    },
  },
  actors: {
    createAsset: fromPromise(async (payload) => {
      console.log('payload', payload);
      return new Promise((resolve, reject) => resolve(payload.input));
    }),
  },
  types: {
    context: {} as MachineContext,
    events: {} as MachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'asset import drawer',
  initial: 'PRE_SUBMIT',
  states: {
    PRE_SUBMIT: {
      on: {
        TO_SUBMITTING: {
          target: 'SUBMITTING',
        },
      },
    },
    SUBMITTED: {
      type: 'final',
    },
    SUBMITTING: {
      invoke: {
        input: ({ context }) => context,
        onDone: {
          target: 'SUBMITTED',
        },
        onError: {
          actions: [{ params: { message: 'hello' }, type: 'unHandleError' }],
          // actions: assign({ error: ({ event }) => event.error }),
          target: 'PRE_SUBMIT',
        },
        src: 'createAsset',
      },
    },
  },
});
