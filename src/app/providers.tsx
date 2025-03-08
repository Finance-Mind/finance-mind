'use client';

import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}

      <Toaster position="bottom-right" />
    </>
  );
}
