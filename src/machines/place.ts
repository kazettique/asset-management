import { assign, setup } from 'xstate';

import { CommonConstant } from '@/constant';
import { FPlace, Id, NType, PFindPagination } from '@/types';

type PlaceMachineContext = {
  modifier: {
    formValues: NType<FPlace>;
    id: NType<Id>;
  };
  searchPayload: PFindPagination;
};

type PlaceMachineEvents =
  | { type: 'TO_CREATE' }
  | { formValues: FPlace; id: Id; type: 'TO_EDIT' }
  | { type: 'TO_MAIN' }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { payload: number; type: 'JUMP_PAGE' };

const INITIAL_CONTEXT: PlaceMachineContext = {
  modifier: { formValues: null, id: null },
  searchPayload: CommonConstant.P_FIND_PAGINATION_DEFAULT,
};

export const placeMachine = setup({
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
    context: {} as PlaceMachineContext,
    events: {} as PlaceMachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'place setting page',
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
