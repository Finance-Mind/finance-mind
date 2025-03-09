import type { Metadata } from 'next';

import { TransactionCategorizer } from '@/components/ai-playground/transaction-categorizer';
import { TransactionExtractor } from '@/components/ai-playground/transaction-extractor';

export const metadata: Metadata = {
  title: 'AI-Powered Playground',
  description: 'Try out our tools for transaction management',
};

export default function AIPlaygroundPage() {
  return (
    <div className="container mx-auto space-y-12 px-8 py-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Playground</h1>

        <p className="text-muted-foreground mt-2">Try out our tools for transaction management</p>
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
