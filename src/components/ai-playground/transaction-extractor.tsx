'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';
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
import { Textarea } from '@/components/ui/textarea';
import type { TransactionCategory, TransactionType } from '@/interfaces/enums';
import {
  transactionExtractorFormSchema,
  type TransactionExtractorFormValues,
} from '@/schemas/form-schemas';
import type { TransactionExtraction } from '@/schemas/transaction-schemas';

export const TransactionExtractor = () => {
  const [result, setResult] = useState<TransactionExtraction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the form with react-hook-form
  const form = useForm<TransactionExtractorFormValues>({
    resolver: zodResolver(transactionExtractorFormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (values: TransactionExtractorFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use the server action instead of the API call
      const result = await extractTransactionFields(values.prompt);

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

  // Format date for display
  const formatDate = (date: string) => {
    try {
      const parsed = new Date(date);

      return parsed.toLocaleDateString();
    } catch {
      // Return the original string if it can't be parsed as date
      return date;
    }
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
        <CardTitle>Transaction Extractor</CardTitle>

        <CardDescription>
          Describe a transaction in natural language, and our AI will extract the details.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe Your Transaction</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Examples: 'I spent R$150 at Restaurant Central on groceries yesterday' or 'caio 150' (transfer to Caio)"
                      rows={5}
                      className="mt-1 resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Extracting...' : 'Extract Transaction Details'}
            </Button>
          </form>
        </Form>

        {error && (
          <div className="bg-destructive/20 text-destructive mt-4 rounded-md p-3">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>

            <div className="space-y-2">
              <h3 className="font-medium">Extracted Details:</h3>

              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Description:</div>

                <div className="text-sm">{result.description}</div>

                <div className="text-sm font-medium">Amount:</div>

                <div className="text-sm">{`${result.amount} ${result.currency || 'BRL'}`}</div>

                <div className="text-sm font-medium">Date:</div>

                <div className="text-sm">{formatDate(result.date)}</div>

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
                      {`${result.installmentInfo.current}/${result.installmentInfo.total}`}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex flex-col space-y-4 pt-8">
        <div>
          <h3 className="mb-2 text-sm font-medium">How It Works</h3>

          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">
              The Transaction Extractor uses AI to parse natural language descriptions into
              structured transaction data.
            </p>

            <p className="text-muted-foreground text-xs">Try examples like:</p>

            <ul className="text-muted-foreground list-decimal space-y-1 pl-4 text-xs">
              <li>&quot;I paid R$150 for groceries at Mercado Extra yesterday&quot;</li>

              <li>&quot;Received my salary of R$3500 from Company XYZ&quot;</li>

              <li>
                &quot;Smartphone installment payment of R$210, 3rd of 12 monthly payments&quot;
              </li>

              <li>&quot;Transferred R$500 from my checking account to my savings account&quot;</li>

              <li>&quot;caio 150&quot; (transfer to Caio of R$150)</li>

              <li>&quot;jon 100&quot; (transfer to Jon of R$100)</li>

              <li>&quot;+150 maria&quot; (received R$150 from Maria)</li>
            </ul>
          </div>
        </div>

        <Button variant="outline" className="mt-4 w-full" onClick={handleReset}>
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
};
