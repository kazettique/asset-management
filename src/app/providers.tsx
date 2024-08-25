// app/providers.jsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, useState } from 'react';

export default function Providers({ children }: { children: ReactElement }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
