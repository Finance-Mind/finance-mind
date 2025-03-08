
import { TransactionCategorizer } from '@/components/ai-playground/transaction-categorizer';
import { TransactionExtractor } from '@/components/ai-playground/transaction-extractor';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Powered Playground',
  description: 'Try out our tools for transaction management',
};

export default function AIPlaygroundPage() {
  return (
    <div className="container mx-auto px-8 py-16 space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Playground</h1>
        <p className="mt-2 text-muted-foreground">Try out our tools for transaction management</p>
      </div>

      <div className="flex flex-wrap gap-8">
        {/* Transaction Extractor Section */}
        <TransactionExtractor />

        {/* Transaction Categorizer Section */}
        <TransactionCategorizer />
      </div>
    </div>
  );
}
