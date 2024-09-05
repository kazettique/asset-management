'use client';

import { Transition } from '@headlessui/react';
import { useState } from 'react';

import BasicButton from '@/components/BasicButton';
import Drawer from '@/components/Drawer';
import Modal from '@/components/Modal';

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative h-full bg-slate-50">
      <h1>Hello, Test Page!</h1>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="hello drawer">
        this is the content for drawer!!
      </Drawer>
      <BasicButton onClick={() => setIsOpen(true)}>btn</BasicButton>
      <BasicButton variant="secondary" onClick={() => setIsOpen((prev) => !prev)}>
        btn2
      </BasicButton>
      <Transition show={isOpen}>
        <div className="transition duration-300 ease-in data-[closed]:opacity-0">I will fade in and out</div>
      </Transition>
      {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </div>
  );
}
