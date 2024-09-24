import { assign, setup } from 'xstate';

import { TagConstant } from '@/constant';
import { FTag, Id, NType, PTagFind } from '@/types';

type TagMachineContext = {
  modifier: {
    formValues: NType<FTag>;
    id: NType<Id>;
  };
  searchPayload: PTagFind;
};

type TagMachineEvents =
  | { type: 'TO_CREATE' }
  | { formValues: FTag; id: Id; type: 'TO_EDIT' }
  | { type: 'TO_MAIN' }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { payload: number; type: 'JUMP_PAGE' };

const INITIAL_CONTEXT: TagMachineContext = {
  modifier: { formValues: null, id: null },
  searchPayload: TagConstant.P_TAG_FIND_DEFAULT,
};

export const tagMachine = setup({
  actions: {
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
  },
  types: {
    context: {} as TagMachineContext,
    events: {} as TagMachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'tag setting page',
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
      },
    },
  },
});
