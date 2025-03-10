'use client';

import { useState } from 'react';

import { ManualTransactionForm } from '@/components/overview/manual-transaction-form';
import { StatementFileUploader } from '@/components/overview/statement-file-uploader/card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Transaction } from '@/schemas/transaction';
import { TransactionCategory } from '@/types/transaction/enums/transaction-category';

export default function OverviewPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Handler for processed transactions
  const handleTransactionsProcessed = (
    newTransactions: Transaction[],
    newErrors?: string[],
    newWarnings?: string[]
  ) => {
    // Update the transaction list
    setTransactions(prev => {
      // Combine existing and new transactions
      // In a real app, we would check for duplicates here
      const combined = [...newTransactions, ...prev];

      // Sort transactions by date (newest first)
      return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    // Update errors and warnings
    if (newErrors && newErrors.length > 0) {
      setErrors(prev => [...newErrors, ...prev]);
    }

    if (newWarnings && newWarnings.length > 0) {
      setWarnings(prev => [...newWarnings, ...prev]);
    }
  };

  // Format currency for display
  const formatCurrency = (amount: number, currency: string = 'BRL') => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  // Format date for display
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  };

  return (
    <div className="container mx-auto px-8 py-16">
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Upload Bank Statements */}
        <StatementFileUploader onTransactionsProcessed={handleTransactionsProcessed} />

        {/* Add Manual Transaction */}
        <ManualTransactionForm />
      </div>

      {/* Errors and Warnings */}
      {(errors.length > 0 || warnings.length > 0) && (
        <Card className="mb-8 border">
          <CardHeader>
            <CardTitle>Processing Messages</CardTitle>

            <CardDescription>
              {errors.length > 0 ? 'Some errors occurred during processing' : 'Processing notes'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-destructive mb-2 text-sm font-medium">Errors:</h3>

                <ul className="text-destructive/80 list-disc space-y-1 pl-5 text-sm">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {warnings.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-amber-600">Warnings:</h3>

                <ul className="list-disc space-y-1 pl-5 text-sm text-amber-600/80">
                  {warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      <Card className="mb-8 border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>

              <CardDescription>AI-powered categorized transactions</CardDescription>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 h-4 w-4"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />

                  <line x1="3" x2="21" y1="9" y2="9" />

                  <line x1="9" x2="9" y1="21" y2="9" />
                </svg>
                Filter
              </Button>

              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 h-4 w-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

                  <polyline points="7 10 12 15 17 10" />

                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b transition-colors">
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>

                    <th className="h-12 px-4 text-left align-middle font-medium">Description</th>

                    <th className="h-12 min-w-[200px] px-4 text-left align-middle font-medium">
                      Category
                    </th>

                    <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>

                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction, index) => {
                      // Create a composite key using both the transaction ID and array index
                      // This ensures uniqueness even if the transaction ID is somehow duplicated
                      const uniqueKey = `${transaction.id}-${index}`;

                      return (
                        <tr
                          key={uniqueKey}
                          className="hover:bg-muted/50 border-b transition-colors last:border-b-0"
                        >
                          <td className="p-4 align-middle">{formatDate(transaction.date)}</td>

                          <td className="p-4 align-middle">
                            {transaction.description}

                            {transaction.merchant && (
                              <div className="text-muted-foreground text-xs">
                                {transaction.merchant}
                              </div>
                            )}

                            {transaction.card && (
                              <div className="text-primary mt-1 text-xs font-medium">
                                {transaction.card}
                              </div>
                            )}
                          </td>

                          <td className="p-4 align-middle">
                            <span
                              className={`inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold ${
                                transaction.isInternalTransfer
                                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                                  : transaction.isP2PTransfer
                                    ? 'border-purple-200 bg-purple-50 text-purple-700'
                                    : transaction.type === 'INCOME'
                                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                      : transaction.type === 'OUTCOME'
                                        ? 'border-red-200 bg-red-50 text-red-700'
                                        : 'border-blue-200 bg-blue-50 text-blue-700'
                              }`}
                            >
                              {transaction.isInternalTransfer
                                ? 'Internal Transfer'
                                : transaction.category !== TransactionCategory.UNCATEGORIZED
                                  ? transaction.category
                                  : 'P2P Transfer'}
                            </span>

                            {transaction.installment && (
                              <div className="text-muted-foreground mt-1 text-xs">
                                {`Installment ${transaction.installment.current}/${transaction.installment.total}`}
                              </div>
                            )}

                            {(transaction.isInternalTransfer || transaction.isP2PTransfer) &&
                              transaction.transfer && (
                                <div className="mt-1 text-xs text-blue-600">
                                  {transaction.transfer.fromPerson &&
                                  transaction.transfer.toPerson ? (
                                    <>
                                      {`From: ${transaction.transfer.fromPerson} → To: ${transaction.transfer.toPerson}`}
                                    </>
                                  ) : transaction.transfer.fromAccount &&
                                    transaction.transfer.toAccount ? (
                                    <>
                                      {`From: ${transaction.transfer.fromAccount} → To: ${transaction.transfer.toAccount}`}
                                    </>
                                  ) : null}
                                </div>
                              )}
                          </td>

                          <td className="p-4 align-middle">
                            <span
                              className={
                                transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'
                              }
                            >
                              {formatCurrency(transaction.amount, transaction.currency)}
                            </span>
                          </td>

                          <td className="p-4 align-middle">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M12 20h9" />

                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>

                                <span className="sr-only">Edit</span>
                              </Button>

                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M3 6h18" />

                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />

                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                </svg>

                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-muted-foreground p-4 text-center">
                        No transactions found. Upload a bank statement or add a manual transaction.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
