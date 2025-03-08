'use client';

import type { ReactNode } from 'react';

import { ToastProvider, Toaster } from '@/components/ui/use-toast';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  );
}
