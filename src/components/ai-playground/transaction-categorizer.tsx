'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { categorizeTransaction } from '@/actions/ai/categorize-transaction';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { transactionCategorizerFormSchema } from '@/schemas/form-schemas';

import type { TransactionCategory, TransactionType } from '@/lib/ai/types';
import type { TransactionCategorizerFormValues } from '@/schemas/form-schemas';
import type { TransactionCategorizeResponse } from '@/schemas/transaction-schemas';

export const TransactionCategorizer = () => {
  const [result, setResult] = useState<TransactionCategorizeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the form with react-hook-form
  const form = useForm<TransactionCategorizerFormValues>({
    resolver: zodResolver(transactionCategorizerFormSchema),
    defaultValues: {
      description: '',
      amount: '',
      date: '',
      merchant: '',
    },
  });

  const onSubmit = async (values: TransactionCategorizerFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use the server action instead of fetch API
      const result = await categorizeTransaction({
        description: values.description,
        amount: parseFloat(values.amount),
        date: values.date ? values.date : new Date().toISOString(),
        merchant: values.merchant || undefined,
      });

      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get the category label
  const getCategoryLabel = (category: TransactionCategory) => {
    return category
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  // Helper function to get the type label
  const getTypeLabel = (type: TransactionType) => {
    return type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1);
  };

  // Reset form and results
  const handleReset = () => {
    form.reset();
    setResult(null);
    setError(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Transaction Categorizer</CardTitle>
        <CardDescription>Enter transaction details to categorize it using AI.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Transaction description (e.g., 'Groceries' or 'caio')"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter amount (negative for expenses)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Transaction date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="merchant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Merchant (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Merchant name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Categorizing...' : 'Categorize Transaction'}
            </Button>
          </form>
        </Form>

        {error && (
          <div className="mt-4 p-3 bg-destructive/20 text-destructive rounded-md">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>

            <div className="space-y-2">
              <h3 className="font-medium">Result:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Category:</div>
                <div className="text-sm">{getCategoryLabel(result.category)}</div>

                <div className="text-sm font-medium">Type:</div>
                <div className="text-sm">{getTypeLabel(result.type)}</div>

                {result.merchant && (
                  <>
                    <div className="text-sm font-medium">Merchant:</div>
                    <div className="text-sm">{result.merchant}</div>
                  </>
                )}

                {result.isInstallment && result.installmentInfo && (
                  <>
                    <div className="text-sm font-medium">Installment:</div>
                    <div className="text-sm">
                      {result.installmentInfo.current}/{result.installmentInfo.total}
                    </div>
                  </>
                )}

                {result.confidence !== undefined && (
                  <>
                    <div className="text-sm font-medium">Confidence:</div>
                    <div className="text-sm">{(result.confidence * 100).toFixed(1)}%</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 mt-auto pt-8">
        <div>
          <h3 className="text-sm font-medium mb-2">How It Works</h3>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              The Transaction Categorizer uses AI to intelligently categorize transactions based on
              description and amount.
            </p>
            <p className="text-xs text-muted-foreground">Our system:</p>
            <ul className="text-xs text-muted-foreground list-decimal pl-4 space-y-1">
              <li>
                Uses advanced language models to handle Brazilian financial terms and patterns
              </li>
              <li>Detects installment payments, transfers, and other special transaction types</li>
              <li>
                Recognizes person-to-person transfers like "caio 150" or "jon 100" as PIX
                transactions
              </li>
              <li>
                All processing happens securely on the server, with no data stored permanently
              </li>
            </ul>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4" onClick={handleReset}>
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
};
