import { assign, setup } from 'xstate';

import { CommonConstant } from '@/constant';
import { FMethod, Id, NType, PFindPagination } from '@/types';

type MethodMachineContext = {
  modifier: {
    formValues: NType<FMethod>;
    id: NType<Id>;
  };
  searchPayload: PFindPagination;
};

type MethodMachineEvents =
  | { type: 'TO_CREATE' }
  | { formValues: FMethod; id: Id; type: 'TO_EDIT' }
  | { type: 'TO_MAIN' }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { payload: number; type: 'JUMP_PAGE' };

const INITIAL_CONTEXT: MethodMachineContext = {
  modifier: { formValues: null, id: null },
  searchPayload: CommonConstant.P_FIND_PAGINATION_DEFAULT,
};

export const methodMachine = setup({
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
    context: {} as MethodMachineContext,
    events: {} as MethodMachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'method setting page',
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
