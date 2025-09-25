export const removeBase64Prefix = (imageString: string) => {
  const base64Prefix = 'data:image/png;base64,'
  if (imageString.startsWith(base64Prefix)) {
    return imageString.replace(base64Prefix, '')
  }
  return imageString
}


export const GLOBAL_CONSTANTS = {
  loanRepaymentConfigColumn: 'loan-repayment-config-column',
  loanReceiptConfigColumn: 'loan-receipt-config-column',
  applicationConfigColumn: 'application-config-column',
  loanConfigColumn: 'loan-config-column',
  borrowerConfigColumn: 'borrower-config-column',
}

export const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi

export const MONTHLY_INCOME_CONFIG = [
  {
    key: 'monthly_income_1',
    placeholder: 'Monthly Income 1',
    desc: '1st month',
  },
  {
    key: 'monthly_income_2',
    placeholder: 'Monthly Income 2',
    desc: '2nd month',
  },
  {
    key: 'monthly_income_3',
    placeholder: 'Monthly Income 3',
    desc: '3rd month',
  },
]

// export const IS_LOCAL = window.location.hostname === 'localhost' && false
