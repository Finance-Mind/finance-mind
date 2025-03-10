# AI Transaction Processing Actions

This directory contains specialized AI-powered server actions for processing financial transactions in FinanceMind. These actions leverage the Vercel AI SDK with OpenAI's models to extract, categorize, and structure financial transaction data from various inputs.

## Overview

The AI actions in this directory provide intelligent processing capabilities for:

1. **Transaction Field Extraction**: Parsing natural language inputs to extract structured transaction data
2. **Transaction Categorization**: Analyzing transaction details to assign appropriate categories and types
3. **Column Identification**: Analyzing bank statement headers and sample data to identify relevant columns
4. **Card Information Extraction**: Extracting card details from filenames and transaction data
5. **Person-to-Person Transfer Detection**: Identifying transfers between accounts and determining if they're internal

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
//   type: "EXPENSE",
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
- Transaction type (INCOME, EXPENSE, TRANSFER)
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

### 3. `identifyColumns`

Analyzes bank statement headers and sample data to identify relevant transaction columns.

**Location**: `identify-columns.ts`

**Functionality**:

- Maps column headers to standard transaction fields
- Analyzes sample data to understand column content and purpose
- Supports multiple languages (Portuguese, English, Spanish)
- Provides confidence level for the mapping
- Adapts to different statement formats from various financial institutions

**Input**: Column headers array and sample data rows

**Output**: `ColumnMapping` object containing:

- Mappings for standard fields (date, amount, description, etc.)
- Confidence level for the overall mapping

**Example Usage**:

```typescript
import { identifyColumns } from '@/actions/ai/identify-columns';

const result = await identifyColumns(
  ['Data', 'Descrição', 'Valor', 'Saldo'],
  [
    { Data: '12/05/2023', Descrição: 'Supermercado', Valor: -120.5, Saldo: 2500.3 },
    { Data: '14/05/2023', Descrição: 'Restaurante', Valor: -85.0, Saldo: 2415.3 },
  ]
);
// Result: {
//   date: "Data",
//   description: "Descrição",
//   amount: "Valor",
//   balance: "Saldo",
//   confidence: 0.95
// }
```

### 4. `extractCardFromFilename`

Extracts bank and card information from statement filenames.

**Location**: `extract-card-info.ts`

**Functionality**:

- Analyzes filename patterns to identify bank and card information
- Detects bank names, card types, and account types
- Extracts statement periods or card identifiers if present
- Specializes in Brazilian bank terminology and naming patterns
- Provides confidence level for the extraction

**Input**: Filename string

**Output**: `CardExtraction` object containing:

- Bank name
- Card type
- Account type
- Statement period
- Confidence level

**Example Usage**:

```typescript
import { extractCardFromFilename } from '@/actions/ai/extract-card-info';

const result = await extractCardFromFilename('nubank_fatura_abril_2023.csv');
// Result: {
//   bankName: "Nubank",
//   accountType: "credit",
//   statementType: "monthly",
//   statementPeriod: "abril 2023",
//   confidence: 0.95
// }
```

### 5. `extractCardInfoFromRow`

Extracts card information from transaction row data.

**Location**: `extract-card-info-from-row.ts`

**Functionality**:

- Analyzes transaction data to identify card-related information
- Detects card types, bank names, and card identifiers
- Determines if it's a credit or debit card
- Extracts card product names if available
- Formats the extracted information into a readable string

**Input**: Transaction row data as key-value pairs

**Output**: `CardExtractionFromRow` object containing:

- Card type
- Card identifier
- Bank name
- Credit/debit flag
- Card product name
- Confidence level

**Example Usage**:

```typescript
import { extractCardInfoFromRow, formatCardInfo } from '@/actions/ai/extract-card-info-from-row';

const extraction = await extractCardInfoFromRow({
  description: 'Compra no Cartão Visa Final 1234 - Supermercado',
  amount: -120.5,
});
// Extraction: {
//   cardType: "Visa",
//   cardIdentifier: "Final 1234",
//   isCredit: true,
//   confidence: 0.9
// }

const formattedCard = await formatCardInfo(extraction);
// Result: "Credit Visa - Final 1234"
```

### 6. `detectP2PTransfer`

Identifies person-to-person transfers and determines if they're internal transfers.

**Location**: `detect-person-to-person-transfer.ts`

**Functionality**:

- Analyzes transaction data to detect person-to-person transfers
- Determines if transfers are between the user's own accounts (internal)
- Matches pairs of transactions that represent two sides of the same transfer
- Identifies the source and destination of the transfer when possible
- Specializes in Brazilian transfer terminology (PIX, TED, DOC)
- Provides explanation and confidence level for the detection

**Input**: Transaction to analyze, array of other transactions, list of known accounts and cards

**Output**: `P2PTransferDetection` object containing:

- Whether it's a P2P transfer
- Whether it's an internal transfer
- ID of matching transaction if found
- Source and destination persons/accounts
- Explanation for the detection
- Confidence level

**Example Usage**:

```typescript
import { detectP2PTransfer } from '@/actions/ai/detect-person-to-person-transfer';

const result = await detectP2PTransfer(transaction, otherTransactions, ['Nubank', 'Itaú Checking']);
// Result: {
//   isP2PTransfer: true,
//   isInternalTransfer: true,
//   confidence: 0.92,
//   matchingTransactionId: "tx-12345",
//   fromPerson: "Own Nubank Account",
//   toPerson: "Own Itaú Account",
//   reason: "Transfer between two accounts owned by the same person"
// }
```

## Technical Details

### Models and Configuration

- Uses OpenAI's models via the Vercel AI SDK
- Default model is defined in `@/lib/ai`
- Uses low temperature (0.1-0.2) for consistent, predictable results
- Leverages the Vercel AI SDK's `generateObject` for structured output generation

### Schema Validation

- Uses Zod for schema validation and type safety
- Schema properties include descriptions to guide the AI model
- Ensures consistent data structure for application processing
- Implements proper transformers for complex data types

### Error Handling

- All functions include robust error handling
- Checks AI SDK warnings for potential issues
- Provides fallback mechanisms for parsing failures
- Implements detailed error logging for troubleshooting

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
- User configuration: `@/config/user`
