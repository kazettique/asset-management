'use client';

import { Transition } from '@headlessui/react';
import { ReactElement } from 'react';

import BasicIcon from './BasicIcon';

interface Props {
  children?: ReactElement | string;
  disableClose?: boolean;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function BasicDrawer(props: Props) {
  const { isOpen, onClose, children, title, disableClose = false } = props;

  return (
    <>
      <Transition show={isOpen}>
        <div
          className="absolute z-10 w-full h-full bg-gray-500 bg-opacity-75 top-0 left-0 transition duration-300 data-[closed]:opacity-0"
          data-test-comp={BasicDrawer.name}
        />
      </Transition>

      <Transition show={isOpen}>
        <section className="absolute z-20 right-0 top-0 bg-gray-50 dark:bg-gray-800 h-full flex flex-col gap-y-4 transition translate-x-0 data-[closed]:translate-x-full">
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="font-bold text-xl dark:text-gray-50 capitalize">{title}</div>
            <BasicIcon
              disabled={disableClose}
              onClick={onClose}
              iconType="x-lg"
              className="cursor-pointer hover:bg-slate-200 rounded-sm transition-all p-1"
            />
          </div>
          <div className="overflow-y-auto grow">{children}</div>
        </section>
      </Transition>
    </>
  );
}
