'use client';

import { useState } from 'react';

import { FileUploader } from '@/components/file-uploader';
import { ManualTransactionForm } from '@/components/manual-transaction-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionCategory } from '@/interfaces/enums';

import type { Transaction } from '@/interfaces/transaction';

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upload Bank Statements */}
        <FileUploader onTransactionsProcessed={handleTransactionsProcessed} />

        {/* Add Manual Transaction */}
        <ManualTransactionForm />
      </div>

      {/* Errors and Warnings */}
      {(errors.length > 0 || warnings.length > 0) && (
        <Card className="border mb-8">
          <CardHeader>
            <CardTitle>Processing Messages</CardTitle>

            <CardDescription>
              {errors.length > 0 ? 'Some errors occurred during processing' : 'Processing notes'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-destructive mb-2">Errors:</h3>

                <ul className="space-y-1 text-sm text-destructive/80 list-disc pl-5">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {warnings.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-amber-600 mb-2">Warnings:</h3>

                <ul className="space-y-1 text-sm text-amber-600/80 list-disc pl-5">
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
      <Card className="border mb-8">
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
                  className="h-4 w-4 mr-1"
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
                  className="h-4 w-4 mr-1"
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
                  <tr className="border-b transition-colors bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>

                    <th className="h-12 px-4 text-left align-middle font-medium">Description</th>

                    <th className="h-12 px-4 text-left align-middle font-medium min-w-[200px]">
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
                          className="border-b last:border-b-0 transition-colors hover:bg-muted/50"
                        >
                          <td className="p-4 align-middle">{formatDate(transaction.date)}</td>

                          <td className="p-4 align-middle">
                            {transaction.description}

                            {transaction.merchant && (
                              <div className="text-xs text-muted-foreground">
                                {transaction.merchant}
                              </div>
                            )}

                            {transaction.card && (
                              <div className="text-xs font-medium text-primary mt-1">
                                {transaction.card}
                              </div>
                            )}
                          </td>

                          <td className="p-4 align-middle">
                            <span
                              className={`inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold ${
                                transaction.isInternalTransfer
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : transaction.isP2PTransfer
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : transaction.type === 'INCOME'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : transaction.type === 'OUTCOME'
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-blue-50 text-blue-700 border-blue-200'
                              }`}
                            >
                              {transaction.isInternalTransfer
                                ? 'Internal Transfer'
                                : transaction.category !== TransactionCategory.UNCATEGORIZED
                                  ? transaction.category
                                  : 'P2P Transfer'}
                            </span>

                            {transaction.installment && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {`Installment ${transaction.installment.current}/${transaction.installment.total}`}
                              </div>
                            )}

                            {(transaction.isInternalTransfer || transaction.isP2PTransfer) &&
                              transaction.transfer && (
                                <div className="text-xs text-blue-600 mt-1">
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
                      <td colSpan={5} className="p-4 text-center text-muted-foreground">
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
