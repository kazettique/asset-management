'use client';

import { Transition } from '@headlessui/react';
import { useMachine } from '@xstate/react';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';

import BasicButton from '@/components/BasicButton';
import BasicDrawer from '@/components/BasicDrawer';
import Modal from '@/components/Modal';
import { IMPORT_PAYLOAD, taskQueueMachine, TaskStatus } from '@/machines/test';
import { Utils } from '@/utils';

const raw = Array.from(Array(20).fill('')).map((item, index) => index + 1);

export default function Page() {
  const [state, send] = useMachine(taskQueueMachine, {});

  const handleStart = () => {
    // for (let i = 0; i < IMPORT_PAYLOAD.length; i++) {
    //   await Utils.WaitTimer(10);
    //   send({ payload: IMPORT_PAYLOAD[i], type: 'ADD_TASK_TO_QUEUE' });
    // }
    send({ payload: IMPORT_PAYLOAD, type: 'IMPORT_TASK_TO_QUEUE' });
  };

  return (
    <div className="relative h-full bg-slate-50 dark:bg-slate-800 dark:text-slate-50">
      <h1>Hello, Test Page!</h1>
      <BasicButton onClick={handleStart}>Start</BasicButton>

      <JSONPretty id="json-pretty" data={state.value} className="p-4" />

      <div className="p-4 bg-slate-200 dark:bg-slate-700">
        {Object.entries(state.context.tasks).map(([key, value], index) => (
          <div key={key} className="flex gap-4">
            <div>{index}</div>
            <div>{value.name}</div>
            <div
              data-status={value.status}
              className='data-[status="DONE"]:text-green-500 data-[status="FAILED"]:text-red-500 data-[status="PROCESSING"]:text-blue-500'
            >
              {value.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
