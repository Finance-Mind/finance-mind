// Define transaction types
export enum TransactionType {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
  TRANSFER = 'TRANSFER',
}

// Define transaction categories
export enum TransactionCategory {
  // Income categories
  SALARY = 'SALARY',
  INVESTMENT_INCOME = 'INVESTMENT_INCOME', // Keep this as income from investments, not the investments themselves
  REIMBURSEMENT = 'REIMBURSEMENT',
  GIFT = 'GIFT',
  OTHER_INCOME = 'OTHER_INCOME',

  // Expense categories
  GROCERIES = 'GROCERIES',
  DINING = 'DINING',
  ENTERTAINMENT = 'ENTERTAINMENT',
  TRANSPORTATION = 'TRANSPORTATION',
  UTILITIES = 'UTILITIES',
  HOUSING = 'HOUSING',
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  SHOPPING = 'SHOPPING',
  TRAVEL = 'TRAVEL',
  PERSONAL_CARE = 'PERSONAL_CARE',
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
  OTHER_EXPENSE = 'OTHER_EXPENSE',

  // Unknown/uncategorized
  UNCATEGORIZED = 'UNCATEGORIZED',
}

// Define investment categories - separate from transaction categories
export enum InvestmentCategory {
  // General investment types
  STOCKS = 'STOCKS',
  BONDS = 'BONDS',
  MUTUAL_FUNDS = 'MUTUAL_FUNDS',
  ETFS = 'ETFS',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  REAL_ESTATE = 'REAL_ESTATE',
  RETIREMENT = 'RETIREMENT',
  SAVINGS = 'SAVINGS',
  FIXED_INCOME = 'FIXED_INCOME',

  // Brazilian-specific investment types
  TESOURO_DIRETO = 'TESOURO_DIRETO',
  CDB = 'CDB',
  LCI = 'LCI',
  LCA = 'LCA',
  DEBENTURES = 'DEBENTURES',
  FUNDOS_IMOBILIARIOS = 'FUNDOS_IMOBILIARIOS',

  // Other
  OTHER = 'OTHER',
  UNCATEGORIZED = 'UNCATEGORIZED',
}

// Define investment asset classes
export enum AssetClass {
  EQUITY = 'EQUITY', // Stocks, ETFs
  FIXED_INCOME = 'FIXED_INCOME', // Bonds, CDs, Treasury
  CASH = 'CASH', // Savings, Money Market
  CRYPTOCURRENCY = 'CRYPTOCURRENCY', // Bitcoin, Ethereum, other digital assets
  ALTERNATIVE = 'ALTERNATIVE', // Commodities, Art, Collectibles
  REAL_ESTATE = 'REAL_ESTATE', // Property, REITs
  MIXED = 'MIXED', // Mutual Funds, Mixed Portfolios
}

// Define investment transaction types
export enum InvestmentTransactionType {
  BUY = 'BUY', // Purchase of investment
  SELL = 'SELL', // Sale of investment
  DIVIDEND = 'DIVIDEND', // Dividend payment
  INTEREST = 'INTEREST', // Interest payment
  DEPOSIT = 'DEPOSIT', // Deposit to investment account
  WITHDRAWAL = 'WITHDRAWAL', // Withdrawal from investment account
  FEE = 'FEE', // Investment-related fee
  SPLIT = 'SPLIT', // Stock split
  MERGER = 'MERGER', // Company merger affecting holdings
  ACQUISITION = 'ACQUISITION', // Company acquisition affecting holdings
  OTHER = 'OTHER', // Other investment transaction
}
