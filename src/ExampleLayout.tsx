import { ReactElement } from 'react';

export interface Props {
  children: ReactElement;
}

export default function Layout(props: Props) {
  const { children } = props;

  return <section data-test-layout={Layout.name}>{children}</section>;
}
