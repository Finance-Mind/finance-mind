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

  // Calculate derived metrics from transactions
  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTransfers = transactions
    .filter(t => t.type === 'TRANSFER')
    .reduce((sum, t) => sum + t.amount, 0);

  // Use Math.abs on totalTransfers to ensure it's always subtracted as a positive value
  const balance = totalIncome - totalExpenses - Math.abs(totalTransfers);

  console.log('transactions', transactions);
  console.log(
    'income transactions',
    transactions.filter(t => t.type === 'INCOME')
  );
  console.log(
    'expense transactions',
    transactions.filter(t => t.type === 'EXPENSE')
  );
  console.log(
    'transfer transactions',
    transactions.filter(t => t.type === 'TRANSFER')
  );
  console.log('totalIncome', totalIncome);
  console.log('totalExpenses', totalExpenses);
  console.log('totalTransfers', totalTransfers);
  console.log('balance', balance);

  // Calculate top expense categories
  const expensesByCategory = transactions
    .filter(t => t.type === 'EXPENSE' || t.type === 'TRANSFER')
    .reduce(
      (acc, transaction) => {
        const category = transaction.category;

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += transaction.amount;

        return acc;
      },
      {} as Record<string, number>
    );

  const topCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Handler for processed transactions
  const handleTransactionsProcessed = (
    newTransactions: Transaction[],
    newErrors?: string[],
    newWarnings?: string[]
  ) => {
    console.log('Processing new transactions:', newTransactions.length);

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
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                  Warnings:
                </h3>

                <ul className="list-disc space-y-1 pl-5 text-sm text-amber-600/80 dark:text-amber-400/90">
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
                                  ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                  : transaction.isP2PTransfer
                                    ? 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                    : transaction.type === 'INCOME'
                                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : transaction.type === 'EXPENSE'
                                        ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300'
                                        : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
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
                                <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">
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

                          <td className="p-4 align-middle whitespace-nowrap">
                            <span
                              className={
                                transaction.amount < 0
                                  ? 'text-red-600 dark:text-red-400'
                                  : 'text-emerald-600 dark:text-emerald-400'
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

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Month Overview Card */}
        <Card className="border">
          <CardHeader>
            <CardTitle>Month Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Income</span>

                  <span className="text-sm text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>

                <div className="h-2.5 w-full bg-emerald-100 dark:bg-emerald-900">
                  <div
                    className="h-2.5 bg-emerald-500 dark:bg-emerald-600"
                    style={{
                      width: '100%',
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Expenses</span>

                  <span className="text-sm text-red-500 dark:text-red-400">
                    {formatCurrency(totalExpenses)}
                  </span>
                </div>

                <div className="h-2.5 w-full bg-red-100 dark:bg-red-900">
                  <div
                    className="h-2.5 bg-red-400 dark:bg-red-600"
                    style={{
                      width: `${Math.min(100, (totalExpenses / Math.max(totalIncome, 1)) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Transfers</span>

                  <span className="text-sm text-blue-500 dark:text-blue-400">
                    {formatCurrency(totalTransfers)}
                  </span>
                </div>

                <div className="h-2.5 w-full bg-blue-100 dark:bg-blue-900">
                  <div
                    className="h-2.5 bg-blue-400 dark:bg-blue-600"
                    style={{
                      width: `${Math.min(100, (Math.abs(totalTransfers) / Math.max(totalIncome, 1)) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span>Balance</span>

                  <span
                    className={`${balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}
                  >
                    {formatCurrency(balance)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories Card */}
        <Card className="border">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {topCategories.map(([category, amount], index) => {
                const categoryColors: Record<string, { bg: string; text: string }> = {
                  GROCERIES: {
                    bg: 'bg-emerald-500 dark:bg-emerald-600',
                    text: 'text-emerald-600 dark:text-emerald-400',
                  },
                  DINING: {
                    bg: 'bg-amber-500 dark:bg-amber-600',
                    text: 'text-amber-600 dark:text-amber-400',
                  },
                  ENTERTAINMENT: {
                    bg: 'bg-purple-500 dark:bg-purple-600',
                    text: 'text-purple-600 dark:text-purple-400',
                  },
                  TRANSPORTATION: {
                    bg: 'bg-orange-500 dark:bg-orange-600',
                    text: 'text-orange-600 dark:text-orange-400',
                  },
                  UTILITIES: {
                    bg: 'bg-violet-500 dark:bg-violet-600',
                    text: 'text-violet-600 dark:text-violet-400',
                  },
                  HOUSING: {
                    bg: 'bg-cyan-500 dark:bg-cyan-600',
                    text: 'text-cyan-600 dark:text-cyan-400',
                  },
                  HEALTH: {
                    bg: 'bg-rose-500 dark:bg-rose-600',
                    text: 'text-rose-600 dark:text-rose-400',
                  },
                  EDUCATION: {
                    bg: 'bg-blue-500 dark:bg-blue-600',
                    text: 'text-blue-600 dark:text-blue-400',
                  },
                  SHOPPING: {
                    bg: 'bg-fuchsia-500 dark:bg-fuchsia-600',
                    text: 'text-fuchsia-600 dark:text-fuchsia-400',
                  },
                  TRAVEL: {
                    bg: 'bg-indigo-500 dark:bg-indigo-600',
                    text: 'text-indigo-600 dark:text-indigo-400',
                  },
                  PERSONAL_CARE: {
                    bg: 'bg-pink-500 dark:bg-pink-600',
                    text: 'text-pink-600 dark:text-pink-400',
                  },
                  SUBSCRIPTIONS: {
                    bg: 'bg-lime-500 dark:bg-lime-600',
                    text: 'text-lime-600 dark:text-lime-400',
                  },
                  UNCATEGORIZED: {
                    bg: 'bg-gray-500 dark:bg-gray-600',
                    text: 'text-gray-600 dark:text-gray-400',
                  },
                };

                const defaultColor = {
                  bg: 'bg-gray-500 dark:bg-gray-600',
                  text: 'text-gray-600 dark:text-gray-400',
                };
                const color = categoryColors[category] || defaultColor;

                return (
                  <div key={index}>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-sm ${color.bg}`}></div>

                        <span className="text-sm">{category}</span>
                      </div>

                      <span className={`${color.text}`}>{formatCurrency(amount)}</span>
                    </div>
                  </div>
                );
              })}

              {topCategories.length === 0 && (
                <div className="text-muted-foreground p-4 text-center">
                  No expense data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments Card */}
        <Card className="border">
          <CardHeader>
            <CardTitle>
              Upcoming Payments <span className="text-muted-foreground font-normal">(soon)</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* For demo purposes, we'll show simulated upcoming payments */}
              <div className="border-b pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4>Credit Card Payment</h4>

                    <p className="text-muted-foreground text-xs">Due in 5 days</p>
                  </div>

                  <span className="mt-0.5 text-sm text-red-600 dark:text-red-400">
                    {formatCurrency(1250)}
                  </span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4>Internet Bill</h4>

                    <p className="text-muted-foreground text-xs">Due in 8 days</p>
                  </div>

                  <span className="mt-0.5 text-sm text-red-600 dark:text-red-400">
                    {formatCurrency(120)}
                  </span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4>Smartphone Installment</h4>

                    <p className="text-muted-foreground text-xs">Due in 12 days</p>
                  </div>

                  <span className="mt-0.5 text-sm text-red-600 dark:text-red-400">
                    {formatCurrency(210)}
                  </span>
                </div>
              </div>

              <div className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4>Rent</h4>

                    <p className="text-muted-foreground text-xs">Due in 15 days</p>
                  </div>

                  <span className="mt-0.5 text-sm text-red-600 dark:text-red-400">
                    {formatCurrency(900)}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Button variant="outline" className="w-full">
                  View All Upcoming Payments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
