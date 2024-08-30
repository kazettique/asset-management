'use client';

import { useState } from 'react';
import { useSwitchTransition, useTransition } from 'transition-hook';

export default function Page() {
  const [onOff, setOnOff] = useState(true);
  const { stage, shouldMount } = useTransition(onOff, 300); // (state, timeout)

  const [count, setCount] = useState(0);
  const transition = useSwitchTransition(count, 300, 'default'); // (state, timeout, mode)

  // console.log('onOff', onOff);

  return (
    <>
      <h1>Hello, Test Page!</h1>
      <button onClick={() => setOnOff((prev) => !prev)}>toggle</button>
      {shouldMount && (
        <p
          style={{
            opacity: stage === 'enter' ? 1 : 0,
            transition: '.3s',
          }}
        >
          Hey guys, Im fading
        </p>
      )}
      <hr />
      <div>
        <button onClick={() => setCount(count + 1)}>add</button>
        {transition((state, stage) => (
          <p
            style={{
              opacity: stage === 'enter' ? 1 : 0,
              transform: {
                enter: 'translateX(0%)',
                from: 'translateX(-100%)',
                leave: 'translateX(100%)',
              }[stage],
              transition: '.3s',
            }}
          >
            {state}
          </p>
        ))}
      </div>
    </>
  );
}
