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
