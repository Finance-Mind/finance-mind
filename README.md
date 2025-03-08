# Finance Mind

A personal AI-driven finance tracking tool that processes bank statements, categorizes transactions, and provides insights into your financial health.

## Overview

Finance Mind helps you take control of your financial life by intelligently analyzing your bank statements and organizing transactions in a structured way. It eliminates the manual work of categorizing expenses and tracking your spending patterns across both debit and credit card transactions. Initially focused on Brazilian banks and financial patterns, the system is designed with internationalization in mind.

## Features

- **Bank-Agnostic Statement Processing**: Upload bank statements and credit card statements from any financial institution to let Finance Mind extract the relevant data, with initial optimization for Brazilian bank formats.
- **Transaction Categorization**: AI-powered categorization of transactions based on description and patterns, optimized for Brazilian merchants and transaction descriptions.
- **Manual Transaction Entry**: Add cash transactions, pending charges, or any financial activity not present in bank statements to ensure a complete financial picture.
- **Duplicate Transaction Prevention**: Sophisticated detection system to identify and prevent duplicate transactions when processing multiple statements or uploads, using transaction IDs, matching patterns, and smart comparison algorithms.
- **Internal Transfer Detection**: Intelligently identifies transfers between a user's own accounts across multiple banks or cards, preventing these movements from being counted as expenses or income in financial calculations.
- **Comprehensive Transaction Tracking**: Each transaction is tracked with detailed information:
  - Card identifier (tracking both debit and credit cards)
  - Transaction type (income or expense)
  - Currency
  - Category (groceries, entertainment, utilities, etc.)
  - Date and time
  - Title/Description
  - Installment tracking (total number and current installment)
  - Amount
  - Fee (including Brazilian-specific fees like IOF - Imposto sobre Operações Financeiras)
  - Merchant information
- **Brazilian Financial System Support**: Specialized handling for Brazilian-specific financial concepts like "boletos", installment purchases ("compras parceladas"), and PIX transactions.
- **Credit Card Management**: Track credit card purchases, payment due dates, and current balance.
- **Multi-Currency Support**: Track transactions in different currencies with ability to view all financial data in your preferred currency.
- **Currency Preference Settings**: Select which currency you want to see your financial data in, with automatic conversion at current or historical exchange rates.
- **Installment Plan Tracking**: Track payment plans and upcoming installments.
- **Financial Insights**: View reports on spending habits, income vs. expenses, and category breakdown.

## Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API routes, Server Actions
- **Database**: 
  - PostgreSQL for structured data storage and reliable transaction management
  - Properly indexed for performance and data integrity
  - Robust schema design to ensure data consistency
- **AI/ML**: Simple pattern matching with option for more advanced AI later

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finance-mind.git
   cd finance-mind
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Upload Bank Statements**: Upload your bank statements in CSV or PDF format from any financial institution.
   - Works with statements from any bank or credit card provider
   - Adapts to different statement formats and structures
   - Initial optimization for Brazilian financial institutions

2. **Add Manual Transactions**: Record financial activities not present in your bank statements.
   - Cash payments and receipts
   - Pending transactions
   - Expected future expenses or income
   - Recurring transactions
   - Split expenses between multiple categories

3. **Review Transactions**: Finance Mind will process your statements and extract transactions. Review and adjust categories if needed.
   - Automatically identifies various transaction types (transfers, payments, purchases, etc.)
   - Extracts merchant information and recipient details when available
   - Detects transaction direction (income/expense) based on amount sign
   - Identifies and prevents duplicate transactions from multiple statement uploads
   - Recognizes transfers between your own accounts and excludes them from spending/income calculations

4. **Analyze Finances**: View insights about your spending patterns and financial health.
   - See complete financial picture including both bank statement and manual transactions
   - Track spending across all payment methods (card, cash, digital wallets, etc.)
   - View all financial data in your preferred currency, regardless of the original transaction currency

### Example Statement Processing

Below are examples of how Finance Mind processes different types of bank statements. These examples use Nubank formats for reference and instruction purposes only - the system is designed to work with statements from any financial institution:

#### Debit Statement Example

```
Data,Valor,Identificador,Descrição
04/03/2025,30.00,67c70b82-5ecf-4a1d-a45b-819be60c9c42,Transferência recebida pelo Pix - CAIO RODRIGUES GUIMARAES - •••.229.046-•• - BANCO INTER (0077) Agência: 1 Conta: 6886889-8
04/03/2025,-6.00,67c71184-a923-48d6-ad13-444f18de3968,Transferência enviada pelo Pix - BIANKA VICTORIA OLIVEIRA PEREIRA DOS SANTOS - •••.154.826-•• - BANCO INTER (0077) Agência: 1 Conta: 17104169-0
```

#### Credit Card Statement Example

```
date,title,amount
2025-02-20,Gopag S*Bendito Japa,205.50
2025-02-01,Elidia Isabel Paraizo - Parcela 3/3,114.96
2025-02-17,IOF de atraso,18.22
2025-02-17,Pagamento recebido,-4149.84
2025-02-17,Juros de atraso,167.68
```

The system will:
1. Parse the statement format (regardless of origin bank or account type)
2. Extract transaction details (date, amount, description/title)
3. Check for duplicate transactions using smart matching algorithms
4. Detect special transaction types:
   - Installment purchases (e.g., "Parcela 3/3")
   - Interest and fees (e.g., "IOF", "Juros de atraso")
   - Card payments and credits (e.g., "Pagamento recebido")
   - **Transfers between user's own accounts** (preventing double-counting in financial summaries)
5. Categorize transactions based on patterns
6. Group related transactions (like installments from the same purchase)
7. Track income vs expenses
8. Organize data for financial analysis
9. Store all data securely in the database with proper indexing

## Development

### Running Tests

```bash
pnpm test
```

### Linting

```bash
pnpm run lint
```

### Building for Production

```bash
pnpm run build
pnpm run start
```

## Future Roadmap

While currently designed for personal use, Finance Mind has the potential to grow into a SaaS product with additional features:

- **Open Finance Integration**: Implement support for Brazil's Open Finance system to:
  - Enable direct and secure access to financial data across multiple institutions
  - Eliminate manual statement uploads with real-time transaction synchronization
  - Provide enhanced financial insights through comprehensive data access
  - Support automated categorization with richer transaction metadata
  - Comply with Central Bank of Brazil's regulations and security requirements
- User authentication and multi-user support
- Cloud database integration
- Advanced AI processing for better categorization
- API integrations with banking systems
- International expansion beyond Brazilian banks and financial systems
- Support for additional languages and currencies
- Mobile application
- Subscription-based tiers with advanced features

## License

This project is personal use software.

---

## Support

For any questions or issues, please create an issue in the repository.