/**
 * User configuration with personal financial information
 * This file contains user-specific settings that are used throughout the application
 */

export const userConfig = {
  /**
   * Card holder information - used for identifying the primary account owner
   * in bank statements and financial documents
   */
  cardHolder: {
    name: 'André Victor',
    possibleVariations: ['André', 'Andre Victor', 'Andre V.'],
  },

  /**
   * Default currency settings
   */
  currency: {
    code: 'BRL',
    symbol: 'R$',
  },
};

export type UserConfig = typeof userConfig;
