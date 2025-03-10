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
