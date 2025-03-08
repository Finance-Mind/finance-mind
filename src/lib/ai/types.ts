// Define transaction types
export enum TransactionType {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
  TRANSFER = "TRANSFER",
}

// Define transaction categories
export enum TransactionCategory {
  // Income categories
  SALARY = "SALARY",
  INVESTMENT = "INVESTMENT",
  REIMBURSEMENT = "REIMBURSEMENT",
  GIFT = "GIFT",
  OTHER_INCOME = "OTHER_INCOME",

  // Expense categories
  GROCERIES = "GROCERIES",
  DINING = "DINING",
  ENTERTAINMENT = "ENTERTAINMENT",
  TRANSPORTATION = "TRANSPORTATION",
  UTILITIES = "UTILITIES",
  HOUSING = "HOUSING",
  HEALTH = "HEALTH",
  EDUCATION = "EDUCATION",
  SHOPPING = "SHOPPING",
  TRAVEL = "TRAVEL",
  PERSONAL_CARE = "PERSONAL_CARE",
  SUBSCRIPTIONS = "SUBSCRIPTIONS",
  OTHER_EXPENSE = "OTHER_EXPENSE",

  // Transfer category
  TRANSFER = "TRANSFER",

  // Specific to Brazilian financial system
  PIX = "PIX",
  BOLETO = "BOLETO",
  CREDIT_CARD_PAYMENT = "CREDIT_CARD_PAYMENT",

  // Unknown/uncategorized
  UNCATEGORIZED = "UNCATEGORIZED",
}
