export enum CompanyStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  CLOSED = "Closed"
}

export enum UserTitle {
  MR = 'Mr',
  MS = 'Ms',
  MRS = "Mrs"
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

export enum UserStatus {
  'ACTIVE' = 1,
  'INACTIVE' = 0,
}

export enum CompanyType {
  'System' = 0,
  'AccountingServiceProvider' = 1,
  'CompanyWithFinance' = 2,
  'StartupOrSmallCompany' = 3
}

export enum BatchStatus {
  "Complete" = "Complete",
  "Upload Incomplete" = "Upload Incomplete",
  "Processing" = "Processing"
}

export enum ServicePackageType {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export enum XeroSyncStatus {
  SYNCED = 'SYNCED',
  UNSYNCED = 'UNSYNCED',
}

export enum AccountType {
  // ASSETS
  CurrentAsset = 'Current_Asset',
  FixedAsset = 'Fixed_Asset',
  Inventory = 'Inventory',
  NonCurrentAsset = 'Non_Current_Asset',
  Prepayment = 'Prepayment',

  // EQUITY
  Equity = 'Equity',

  // EXPENSES
  Depreciation = 'Depreciation',
  DirectCosts = 'Direct_Costs',
  Expense = 'Expense',
  Overhead = 'Overhead',

  // LIABILITIES
  CurrentLiability = 'Current_Liability',
  Liability = 'Liability',
  NonCurrentLiability = 'Non_Current_Liability',

  // REVENUE
  OtherIncome = 'Other_Income',
  Revenue = 'Revenue',
  Sales = 'Sales'
}

export enum FinancialStatement {
  Balance_Sheet = 'Balance_Sheet',
  Income_Statement = 'Income_Statement'
}