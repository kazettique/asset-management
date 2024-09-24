import { assign, setup } from 'xstate';

import { BrandConstant } from '@/constant';
import { FBrand, Id, NType, PBrandFind } from '@/types';

type BrandMachineContext = {
  modifier: {
    formValues: NType<FBrand>;
    id: NType<Id>;
  };
  searchPayload: PBrandFind;
};

type BrandMachineEvents =
  | { type: 'TO_CREATE' }
  | { formValues: FBrand; id: Id; type: 'TO_EDIT' }
  | { type: 'TO_MAIN' }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { payload: number; type: 'JUMP_PAGE' };

const INITIAL_CONTEXT: BrandMachineContext = {
  modifier: { formValues: null, id: null },
  searchPayload: BrandConstant.P_BRAND_FIND_DEFAULT,
};

export const brandMachine = setup({
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
    context: {} as BrandMachineContext,
    events: {} as BrandMachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'brand setting page',
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
