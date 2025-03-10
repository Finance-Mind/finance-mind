// Define transaction categories
export enum TransactionCategory {
  // Income categories
  SALARY = 'SALARY',
  INVESTMENT_INCOME = 'INVESTMENT_INCOME', // Keep this as income from investments, not the investments themselves
  REIMBURSEMENT = 'REIMBURSEMENT',
  GIFT = 'GIFT',

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

  // Unknown/uncategorized
  UNCATEGORIZED = 'UNCATEGORIZED',
}
