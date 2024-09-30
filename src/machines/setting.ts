import { assign, setup } from 'xstate';

import { FSetting, Id, NType } from '@/types';

type SettingMachineContext = {
  modifier: {
    formValues: NType<FSetting>;
    id: NType<Id>;
  };
};

type SettingMachineEvents = { formValues: FSetting; id: Id; type: 'TO_EDIT' } | { type: 'TO_MAIN' };

const INITIAL_CONTEXT: SettingMachineContext = {
  modifier: { formValues: null, id: null },
};

export const settingMachine = setup({
  actions: {
    RESET_CONTEXT: assign(INITIAL_CONTEXT),
  },
  types: {
    context: {} as SettingMachineContext,
    events: {} as SettingMachineEvents,
  },
}).createMachine({
  context: INITIAL_CONTEXT,
  description: 'setting page',
  initial: 'MAIN',
  states: {
    EDIT: {
      on: {
        TO_MAIN: { actions: ['RESET_CONTEXT'], target: 'MAIN' },
      },
    },
    MAIN: {
      on: {
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
