'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TransactionType, TransactionCategory } from '@/interfaces/enums';

// Transaction form schema with required fields
const transactionFormSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.coerce.number(),
  category: z.nativeEnum(TransactionCategory),
  type: z.nativeEnum(TransactionType),
  date: z.date(),
  merchant: z.string().optional(),
  currency: z.string().default('BRL'),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

// Helper function to get a display-friendly category name
const getCategoryLabel = (category: string): string => {
  // Convert SNAKE_CASE to Title Case and replace underscores with spaces
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Currencies
const CURRENCIES = [
  { value: 'BRL', label: 'BRL' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

interface ManualTransactionFormProps {
  className?: string;
  title?: string;
  description?: string;
}

export function ManualTransactionForm({
  className = '',
  title = 'Add Manual Transaction',
  description = 'Record financial activities not present in your bank statements',
}: ManualTransactionFormProps) {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  // Initialize form with default values
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      description: '',
      amount: 0,
      category: TransactionCategory.UNCATEGORIZED,
      type: TransactionType.OUTCOME,
      date: new Date(),
      merchant: '',
      currency: 'BRL',
    },
  });

  // Handle AI extraction
  const handleExtractTransaction = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Empty prompt', {
        description: 'Please enter a transaction description to extract',
      });

      return;
    }

    setIsExtracting(true);

    try {
      const extraction = await extractTransactionFields(aiPrompt);

      // Update form with extracted values
      form.setValue('description', extraction.description || '');
      form.setValue('amount', extraction.amount || 0);

      // Type safety for category
      if (
        extraction.category &&
        Object.values(TransactionCategory).includes(extraction.category as TransactionCategory)
      ) {
        form.setValue('category', extraction.category as TransactionCategory);
      }

      // Type safety for transaction type
      if (
        extraction.type &&
        Object.values(TransactionType).includes(extraction.type as TransactionType)
      ) {
        form.setValue('type', extraction.type as TransactionType);
      }

      form.setValue('currency', extraction.currency || 'BRL');
      form.setValue('merchant', extraction.merchant || '');

      if (extraction.date) {
        form.setValue('date', new Date(extraction.date));
      }

      toast.success('Transaction extracted', {
        description: 'The transaction details have been extracted',
      });
    } catch (error) {
      console.error('Error extracting transaction:', error);
      toast.error('Extraction failed', {
        description: 'Could not extract transaction details',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  // Handle form submission
  const onSubmit = (data: TransactionFormValues) => {
    // Here you would typically save the transaction to your database
    console.log('Transaction submitted:', data);
    toast.success('Transaction added', {
      description: 'Your transaction has been successfully added',
    });

    // Reset form
    form.reset();
    setAiPrompt('');
  };

  // Handle key press for quick add input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isExtracting) {
      e.preventDefault();
      handleExtractTransaction();
    }
  };

  return (
    <Card className={`border h-full flex flex-col ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-8">
          {/* Row 1: Input field with button */}
          <div className="flex gap-2">
            <Input
              id="ai-prompt"
              placeholder="Quick add (e.g., '50 for lunch yesterday')"
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />

            <Button
              variant="secondary"
              onClick={handleExtractTransaction}
              disabled={isExtracting}
              className="shrink-0"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extract
                </>
              ) : (
                'Extract'
              )}
            </Button>
          </div>

          <form
            id="transaction-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* Row 2: Currency, Amount, Description */}
            <div className="grid grid-cols-12 gap-3">
              {/* Currency */}
              <div className="col-span-3 space-y-2">
                <Label htmlFor="currency">Currency</Label>

                <Select
                  value={form.watch('currency')}
                  onValueChange={value => form.setValue('currency', value)}
                >
                  <SelectTrigger id="currency" className="w-full">
                    <SelectValue placeholder="BRL" />
                  </SelectTrigger>

                  <SelectContent>
                    {CURRENCIES.map(currency => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="col-span-3 space-y-2">
                <Label htmlFor="amount">Amount</Label>

                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...form.register('amount', { valueAsNumber: true })}
                />

                {form.formState.errors.amount && (
                  <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="col-span-6 space-y-2">
                <Label htmlFor="description">Description</Label>

                <Input
                  id="description"
                  placeholder="Transaction description"
                  {...form.register('description')}
                />

                {form.formState.errors.description && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Type and Category */}
            <div className="flex w-full gap-3">
              {/* Transaction Type */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="transaction-type">Type</Label>

                <Select
                  value={form.watch('type')}
                  onValueChange={value => form.setValue('type', value as TransactionType)}
                >
                  <SelectTrigger id="transaction-type" className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.values(TransactionType).map(type => (
                      <SelectItem key={type} value={type}>
                        {getCategoryLabel(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="category">Category</Label>

                <Select
                  value={form.watch('category')}
                  onValueChange={value => form.setValue('category', value as TransactionCategory)}
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent className="max-h-72">
                    <SelectItem value={TransactionCategory.UNCATEGORIZED}>Uncategorized</SelectItem>

                    {/* Income Categories - Use section dividers instead of invalid empty strings */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-primary">Income</div>

                    <SelectItem value={TransactionCategory.SALARY}>Salary</SelectItem>

                    <SelectItem value={TransactionCategory.INVESTMENT_INCOME}>
                      Investment Income
                    </SelectItem>

                    <SelectItem value={TransactionCategory.REIMBURSEMENT}>Reimbursement</SelectItem>

                    <SelectItem value={TransactionCategory.GIFT}>Gift</SelectItem>

                    {/* Expense Categories - Use section dividers instead of invalid empty strings */}
                    <div className="px-2 py-1.5 text-xs font-semibold text-primary">Expenses</div>

                    <SelectItem value={TransactionCategory.GROCERIES}>Groceries</SelectItem>

                    <SelectItem value={TransactionCategory.DINING}>Dining</SelectItem>

                    <SelectItem value={TransactionCategory.ENTERTAINMENT}>Entertainment</SelectItem>

                    <SelectItem value={TransactionCategory.TRANSPORTATION}>
                      Transportation
                    </SelectItem>

                    <SelectItem value={TransactionCategory.UTILITIES}>Utilities</SelectItem>

                    <SelectItem value={TransactionCategory.HOUSING}>Housing</SelectItem>

                    <SelectItem value={TransactionCategory.HEALTH}>Health</SelectItem>

                    <SelectItem value={TransactionCategory.EDUCATION}>Education</SelectItem>

                    <SelectItem value={TransactionCategory.SHOPPING}>Shopping</SelectItem>

                    <SelectItem value={TransactionCategory.TRAVEL}>Travel</SelectItem>

                    <SelectItem value={TransactionCategory.PERSONAL_CARE}>Personal Care</SelectItem>

                    <SelectItem value={TransactionCategory.SUBSCRIPTIONS}>Subscriptions</SelectItem>
                  </SelectContent>
                </Select>

                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 4: Date and Merchant */}
            <div className="flex w-full gap-3">
              {/* Date */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="date">Date</Label>

                <DatePicker
                  date={form.watch('date')}
                  onSelect={date => form.setValue('date', date || new Date())}
                />

                {form.formState.errors.date && (
                  <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
                )}
              </div>

              {/* Merchant */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="merchant">Merchant</Label>

                <Input
                  id="merchant"
                  placeholder="Merchant or payee (optional)"
                  {...form.register('merchant')}
                />
              </div>
            </div>
          </form>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button type="submit" form="transaction-form" className="w-full">
          Add Transaction
        </Button>
      </CardFooter>
    </Card>
  );
}
