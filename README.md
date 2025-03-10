# Finance Mind

A personal AI-driven finance tracking tool that processes bank statements, categorizes transactions, tracks investments, and provides insights into your financial health.

## Overview

Finance Mind helps you take control of your financial life by intelligently analyzing your bank statements, organizing transactions, and tracking investments in a structured way. It eliminates the manual work of categorizing expenses, tracking your spending patterns across both debit and credit card transactions, and monitoring your investment portfolio. Initially focused on Brazilian banks and financial patterns, the system is designed with internationalization in mind.

## Features

- **Bank-Agnostic Statement Processing**: Upload bank statements and credit card statements from any financial institution to let Finance Mind extract the relevant data, with initial optimization for Brazilian bank formats.
- **Transaction Categorization**: AI-powered categorization of transactions based on description and patterns, optimized for Brazilian merchants and transaction descriptions.
- **Manual Transaction Entry**: Add cash transactions, pending charges, or any financial activity not present in bank statements to ensure a complete financial picture.
- **Duplicate Transaction Prevention**: Sophisticated detection system to identify and prevent duplicate transactions when processing multiple statements or uploads, using transaction IDs, matching patterns, and smart comparison algorithms.
- **AI-Generated Consistent Transaction Identifiers**: Each transaction is assigned a deterministic AI-generated identifier that remains consistent across multiple processing attempts, ensuring that the same transaction will always have the same identifier regardless of how many times it's processed.
- **Internal Transfer Detection**: Intelligently identifies transfers between a user's own accounts across multiple banks or cards, preventing these movements from being counted as expenses or income in financial calculations.
- **Comprehensive Transaction Tracking**: Each transaction is tracked with detailed information:
  - Card name (tracking both debit and credit cards)
  - Transaction type (income, expense, or transfer):
    - **Income**: Money received into an account
    - **Expense**: Money spent from an account
    - **Transfer**: Movement of money between accounts or to another person, with different implications:
      - **Internal Transfer**: Movements between your own accounts (excluded from spending/income calculations)
      - **External Transfer**: Payments to other individuals or entities (treated as expenses)
      - **Transfer Methods**: Supports various transfer types like PIX, wire transfers, ACH, Venmo, etc.
      - **Transfer Tracking**: Intelligently matches incoming and outgoing sides of transfers to prevent double-counting
  - Currency
  - Category (groceries, entertainment, utilities, etc.)
  - Date and time
  - Title/Description
  - Installment tracking (total number and current installment)
  - Amount
  - Fee (including Brazilian-specific fees like IOF - Imposto sobre Operações Financeiras)
  - Merchant information
  - AI-generated identifier (consistent across multiple processing attempts)
- **Brazilian Financial System Support**: Specialized handling for Brazilian-specific financial concepts like "boletos", installment purchases ("compras parceladas"), and PIX transactions.
- **Credit Card Management**: Track credit card purchases, payment due dates, and current balance.
- **Multi-Currency Support**: Track transactions in different currencies with ability to view all financial data in your preferred currency.
- **Currency Preference Settings**: Select which currency you want to see your financial data in, with automatic conversion at current or historical exchange rates.
- **Installment Plan Tracking**: Track payment plans and upcoming installments.
- **Financial Insights**: View reports on spending habits, income vs. expenses, and category breakdown.
- **Investment Portfolio Tracking**: Completely separate from transaction tracking, Finance Mind offers comprehensive investment tracking:
  - Track stocks, bonds, mutual funds, ETFs, cryptocurrency, and other investment types
  - Record purchase and sale transactions for investments
  - Monitor current market values and portfolio performance
  - View historical investment performance with detailed analytics
  - Track dividends, interest, and other investment income
  - Calculate return on investment (ROI), annualized returns, and other performance metrics
  - Visualize asset allocation and portfolio diversification
  - Set investment goals and track progress
  - Import investment statements from brokerages and financial institutions
  - Support for Brazilian-specific investment types like Tesouro Direto, CDBs, LCIs, LCAs, etc.
  - Multi-currency investment tracking with exchange rate conversion

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

4. **Track Investments**: Upload investment statements or manually add investment transactions.

   - Add different types of investments (stocks, bonds, mutual funds, etc.)
   - Record purchase and sale transactions
   - Track dividends and interest received
   - Monitor current market values
   - View performance metrics and reports
   - Categorize investments by asset class, risk level, or custom categories

5. **Analyze Finances**: View insights about your spending patterns, investment performance, and overall financial health.
   - See complete financial picture including transactions and investments
   - Track spending across all payment methods
   - Monitor investment performance and portfolio allocation
   - View all financial data in your preferred currency, regardless of the original transaction or investment currency

### Example Statement Processing

Below are examples of how Finance Mind processes different types of bank statements. These examples use Nubank formats for reference and instruction purposes only - the system is designed to work with statements from any financial institution:

#### Debit Statement Example

```
Data,Valor,Identificador,Descrição
04/03/2025,30.00,67c70b82-5ecf-4a1d-a45b-819be60c9c42,Transferência recebida pelo Pix - JOÃO DA SILVA - •••.123.456-•• - BANCO EXEMPLO (0000) Agência: 1234 Conta: 12345-6
04/03/2025,-6.00,67c71184-a923-48d6-ad13-444f18de3968,Transferência enviada pelo Pix - MARIA OLIVEIRA - •••.789.012-•• - BANCO EXEMPLO (0000) Agência: 5678 Conta: 98765-4
```

#### Credit Card Statement Example

```
date,title,amount
2025-02-20,Restaurante Exemplo,205.50
2025-02-20,Posto de Combustível,100.00
2025-02-20,Academia Central,82.50
2025-02-20,Supermercado Nacional,165.80
2025-02-19,Mercado Local,13.20
2025-02-19,Serviço Digital Ltda,118.74
2025-02-19,"IOF de ""Serviço Digital Ltda""",4.01
2025-02-19,Transferência para João Silva,35.00
2025-02-19,Fast Food Brasil,29.90
2025-02-19,Aplicativo de Transporte,10.18
2025-02-18,Academia Central - Mensalidade,249.90
2025-02-18,Posto de Combustível Avenida,150.00
2025-02-17,Papelaria Central,7.89
2025-02-17,Serviço de Mobilidade,60.00
2025-02-17,IOF de atraso,18.22
2025-02-17,Pagamento recebido,-4149.84
2025-02-17,Encerramento de dívida,-269.22
2025-02-17,Juros de atraso,167.68
2025-02-17,Multa de atraso,83.31
2025-02-01,Loja Departamento - Parcela 3/3,114.96
2025-02-01,Variedades Shopping - Parcela 3/3,83.63
2025-02-01,Papelaria Central - Parcela 2/2,57.99
2025-02-01,Loja de Utilidades - Parcela 3/5,93.57
```
