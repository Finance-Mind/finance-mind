# AI Transaction Processing Actions

This directory contains specialized AI-powered server actions for processing financial transactions in FinanceMind. These actions leverage OpenAI's models to extract, categorize, and structure financial transaction data from various inputs.

## Overview

The AI actions in this directory provide intelligent processing capabilities for:

1. **Transaction Field Extraction**: Parsing natural language inputs to extract structured transaction data
2. **Transaction Categorization**: Analyzing transaction details to assign appropriate categories and types

These actions are designed to support multiple languages (with emphasis on Portuguese, English, and Spanish) and maintain language-specific formatting while providing standardized categorization.

## Actions

### 1. `extractTransactionFields`

Extracts structured transaction data from natural language text input.

**Location**: `extract-transaction-fields.ts`

**Functionality**:

- Parses user input to extract transaction details
- Detects the language of the input
- Preserves the original language in text fields
- Normalizes formatting while keeping language-specific conventions
- Handles date parsing with chrono-node for various language inputs
- Infers reasonable defaults for missing information

**Input**: Free-form text description of a transaction

**Output**: Structured `TransactionExtraction` object containing:

- Description
- Amount (as a number, negative for expenses)
- Date (parsed to ISO format)
- Merchant name (if present)
- Category and type
- Installment information
- Currency

**Example Usage**:

```typescript
import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';

// Example with Portuguese input
const result = await extractTransactionFields('150 para corrida de uber ontem');
// Result: {
//   description: "Corrida de Uber",
//   amount: -150,
//   date: "2023-09-15T00:00:00.000Z", (yesterday's date)
//   merchant: "Uber",
//   category: "TRANSPORTATION",
//   type: "OUTCOME",
//   isInstallment: false,
//   ...
// }
```

### 2. `categorizeTransaction`

Analyzes transaction details to determine the appropriate category, type, and other metadata.

**Location**: `categorize-transaction.ts`

**Functionality**:

- Categorizes transactions based on description, amount, date, and merchant
- Detects special transaction types (PIX, transfers, credit card payments)
- Identifies installment payments
- Extracts and formats merchant information
- Preserves original language in text fields
- Provides confidence level for categorization

**Input**: Transaction details object with description, amount, date, and optional merchant

**Output**: `TransactionCategorizeResponse` object containing:

- Category (from predefined list)
- Transaction type (INCOME, OUTCOME, TRANSFER)
- Confidence level (0.0 to 1.0)
- Formatted merchant name (if available)
- Installment information (if applicable)

**Example Usage**:

```typescript
import { categorizeTransaction } from '@/actions/ai/categorize-transaction';

const result = await categorizeTransaction({
  description: 'Pagamento de fatura do cartão Nubank',
  amount: -500,
  date: '2023-09-15',
  merchant: 'Nubank',
});
// Result: {
//   category: "CREDIT_CARD_PAYMENT",
//   type: "TRANSFER",
//   confidence: 0.95,
//   merchant: "Nubank",
//   isInstallment: false,
//   ...
// }
```

## Technical Details

### Models and Configuration

- Uses OpenAI's models configured in `@/lib/ai`
- Default model is defined in `defaultModel`
- Uses low temperature (0.1) for consistent, predictable results
- Leverages `generateObject` from AI SDK for structured output

### Schema Validation

- Uses strict schema validation for both input and output
- Schemas are defined in `@/schemas/transaction-schemas`
- Ensures consistent data structure for application processing

### Error Handling

- Both functions include robust error handling
- Fallback mechanisms for parsing failures
- Detailed error logging for troubleshooting

## Language Support

These AI actions are designed to be language-aware:

- Detects input language automatically
- Preserves original language in text fields (descriptions, merchant names)
- Uses appropriate formatting conventions for each language
- Only standardizes category and type values to English constants
- Special handling for date expressions in multiple languages

## Related Components

- Transaction schemas: `@/schemas/transaction-schemas`
- AI configuration: `@/lib/ai`
- Transaction types and categories: `@/lib/ai/types`
