import { ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
  className?: string;
  subscription?: string;
  title?: string;
}

export default function Section(props: Props) {
  const { children, className = '', title, subscription } = props;

  return (
    <div className={`bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ${className}`} data-test-comp={Section.name}>
      <div className="mb-4">
        {title && <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{title}</h3>}
        {subscription && <span className="text-base font-normal text-gray-500">{subscription}</span>}
      </div>
      {children}
    </div>
  );
}
