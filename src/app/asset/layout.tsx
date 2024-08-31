import { ReactNode } from 'react';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: ReactNode;
}) {
  return (
    <section className="flex pt-16">
      <div>{children}</div>
    </section>
  );
}
