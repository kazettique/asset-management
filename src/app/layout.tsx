import './globals.css';

import type { Metadata } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

import Providers from './providers';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <section>
            <div className="w-full bg-slate-200 p-4 flex items-center gap-x-4">
              <Link href="/">Home</Link>
              <Link href="/asset">Asset</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/setting">Setting</Link>
            </div>
            {children}
          </section>
        </Providers>
      </body>
    </html>
  );
}
