import { ReactElement } from 'react';

import Drawer from '@/components/Drawer';

export interface Props {
  children?: ReactElement;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AssetImport(props: Props) {
  const { children, className = '', isOpen, onClose } = props;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="create asset">
      <div {...props} className={`className`} data-test-comp={AssetImport.name}>
        import asset form
      </div>
    </Drawer>
  );
}
