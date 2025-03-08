import { z } from 'zod';

import { AssetClass, InvestmentCategory, InvestmentTransactionType } from '@/lib/ai/types';

/**
 * Schema for investment asset
 */
export const investmentAssetSchema = z.object({
  id: z.string().optional(),
  symbol: z.string().describe('The investment symbol/ticker'),
  name: z.string().describe('The full name of the investment'),
  assetClass: z.nativeEnum(AssetClass).describe('The asset class category'),
  category: z.nativeEnum(InvestmentCategory).describe('The specific investment category'),
  description: z.string().optional().describe('Additional information about the investment'),
  currentPrice: z.number().optional().describe('The current market price per unit'),
  currency: z.string().describe('Currency code (e.g., BRL, USD)'),
  region: z.string().optional().describe('Geographic region of the investment'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Schema for investment transaction
 */
export const investmentTransactionSchema = z.object({
  id: z.string().optional(),
  assetId: z.string().describe('The ID of the related investment asset'),
  type: z.nativeEnum(InvestmentTransactionType).describe('The type of investment transaction'),
  date: z.string().or(z.date()).describe('The transaction date'),
  quantity: z.number().describe('The quantity of units involved in the transaction'),
  pricePerUnit: z.number().describe('The price per unit at the time of transaction'),
  totalAmount: z.number().describe('The total transaction amount'),
  fees: z.number().optional().describe('Any fees associated with the transaction'),
  taxes: z.number().optional().describe('Any taxes associated with the transaction'),
  notes: z.string().optional().describe('Additional notes about the transaction'),
  broker: z.string().optional().describe('The broker or platform used for the transaction'),
  currency: z.string().describe('Currency code (e.g., BRL, USD)'),
  exchangeRate: z.number().optional().describe('Exchange rate at the time of transaction'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Schema for investment portfolio
 */
export const investmentPortfolioSchema = z.object({
  id: z.string().optional(),
  name: z.string().describe('The name of the portfolio'),
  description: z.string().optional().describe('Description of the portfolio'),
  assets: z.array(z.string()).describe('Array of asset IDs in this portfolio'),
  baseCurrency: z.string().describe('The base currency for portfolio calculations'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Schema for investment holdings (calculated/current state)
 */
export const investmentHoldingSchema = z.object({
  assetId: z.string().describe('The ID of the investment asset'),
  portfolioId: z.string().optional().describe('The portfolio this holding belongs to'),
  quantity: z.number().describe('Current quantity held'),
  averageCost: z.number().describe('Average cost basis per unit'),
  currentValue: z.number().describe('Current total market value'),
  unrealizedGainLoss: z.number().describe('Unrealized gain/loss amount'),
  unrealizedGainLossPercentage: z.number().describe('Unrealized gain/loss percentage'),
  realizedGainLoss: z.number().describe('Total realized gain/loss from this asset'),
  lastUpdated: z.date().describe('When this holding was last updated'),
});

/**
 * Schema for investment performance metrics
 */
export const investmentPerformanceSchema = z.object({
  assetId: z.string().optional().describe('The asset ID, if for a specific asset'),
  portfolioId: z.string().optional().describe('The portfolio ID, if for a portfolio'),
  timeframe: z.enum(['1D', '1W', '1M', '3M', '6M', '1Y', 'YTD', '3Y', '5Y', 'ALL']),
  startDate: z.date().describe('Start date of the performance period'),
  endDate: z.date().describe('End date of the performance period'),
  startValue: z.number().describe('Value at the start of the period'),
  endValue: z.number().describe('Value at the end of the period'),
  absoluteReturn: z.number().describe('Absolute return amount'),
  percentageReturn: z.number().describe('Percentage return'),
  annualizedReturn: z.number().optional().describe('Annualized return percentage'),
  dividendIncome: z.number().describe('Income from dividends during the period'),
  interestIncome: z.number().describe('Income from interest during the period'),
  contributions: z.number().describe('New money contributed during the period'),
  withdrawals: z.number().describe('Money withdrawn during the period'),
});

// Types for schema inference
export type InvestmentAsset = z.infer<typeof investmentAssetSchema>;
export type InvestmentTransaction = z.infer<typeof investmentTransactionSchema>;
export type InvestmentPortfolio = z.infer<typeof investmentPortfolioSchema>;
export type InvestmentHolding = z.infer<typeof investmentHoldingSchema>;
export type InvestmentPerformance = z.infer<typeof investmentPerformanceSchema>;
