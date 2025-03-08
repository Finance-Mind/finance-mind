'use client';

import { Toaster } from '@/components/ui/sonner';

import type { ReactNode } from 'react';

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
