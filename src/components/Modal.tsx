import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactElement } from 'react';

import { NString } from '@/types';

import Button from './Button';

const DEFAULT_TITLE: string = '標題';
const DEFAULT_PRIMARY_BTN_TEXT = '確定';
const DEFAULT_SECONDARY_BTN_TEXT = '返回';
const DEFAULT_BTN_CALLBACK = () => {};
const DEFAULT_BTN_LINK: NString = null;

export interface Props {
  children?: ReactElement;
  isOpen: boolean;
  onClose: () => void;
  primaryBtnCallback?: Function;
  primaryBtnLink?: NString;
  primaryBtnText?: string;
  secondaryBtnCallback?: Function;
  secondaryBtnLink?: NString;
  secondaryBtnText?: string;
  title?: string;
}

// ref: https://www.creative-tim.com/twcomponents/component/modal-16
export default function Modal(props: Props) {
  const {
    isOpen,
    onClose,
    children,
    title = DEFAULT_TITLE,
    primaryBtnText = DEFAULT_PRIMARY_BTN_TEXT,
    secondaryBtnText = DEFAULT_SECONDARY_BTN_TEXT,
    primaryBtnCallback = DEFAULT_BTN_CALLBACK,
    primaryBtnLink,
    secondaryBtnCallback = DEFAULT_BTN_CALLBACK,
    secondaryBtnLink,
  } = props;

  const handlePrimaryBtnClick = () => {
    primaryBtnCallback();
    onClose();
  };

  const handleSecondaryBtnClick = () => {
    secondaryBtnCallback();
    onClose();
  };

  return (
    <Dialog
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      open={isOpen}
      onClose={onClose}
      unmount={false}
    >
      <DialogPanel>
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <div className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            {children}
            <div className="flex gap-4">
              <Button className="grow" variant="secondary" onClick={handleSecondaryBtnClick}>
                {secondaryBtnText}
              </Button>
              <Button className="grow" onClick={handlePrimaryBtnClick}>
                {primaryBtnText}
              </Button>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
