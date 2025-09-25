/* eslint-disable */

import {
  ChangeEventHandler,
  Dispatch,
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  SetStateAction
} from 'react'
import { StylesConfig } from 'react-select'
import { AnyObject, ObjectSchema } from 'yup'

export type WithChildren = {
  children?: ReactNode
}

export type LoginInfo = {
  email: string
  password_hash: string
  rememberMe?: boolean
}

export type RegisterInfo = {
  first_name: string
  last_name: string
  password_hash: string,
  company_name: string,
  address: string,
  title: string,
  email: string,
  confirm_password: string
  type: string
  country_id?: any
}

export type ForgotPasswordSchema = {
  email: string
}

export type UpdatePasswordInfo = {
  id: number
  old_password: string
  new_password: string
}

export type ErrorResponse = {
  error: boolean
  message: string
}

export type DataResponse<T = any> = {
  error: boolean
  message: string
  pagination?: TypePagination
  data: T
  newData?: T
}

export type LoginResponse = {
  error: boolean
  message: string
  token: string
  formatData: UserInfo
}

export type UserInfo = {
  user_id: any;
  company_id?: number;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  phone_number?: any;
  title: string;
  role: string;
  status: string;
  avatar: string;
  created_at: any;
  updated_at: any;
  country_id?: number;
}

export type updateUserInfo = {
  user_id?: any;
  first_name: string;
  last_name: string;
  username?: string;
  phone_number?: any;
  title: string;
  email: string;
  password_hash?: string;
  confirm_password?: string;
  type?: string
  role?: any;
  company_role?: any;
  organization_id?: any;
  status?: any;
  countries?: string
  avatar?: string;
  created_at?: any;
  name?: string
  updated_at?: any;
  Organization?: {
    name?: string
    Country?: {
      nicename?: string
    }
  },
  startup_assigned?: any
}
export type UpdateUserResponse = {
  error: boolean
  message: string
  token: string
}

export type UpdateById<T = any> = {
  id: number
  data: T
}

export type AvatarProfile = {
  avatar: string;
}

export type TypePagination = {
  pageSize: number
  currentPage: number
  total: number
}

export type SearchCriteria<T = any> = {
  pageSize: number
  currentPage: number
  total: number
  company_id?: number
  filters?: T
  searchBar?: string
  skip?: number
}

export type TableRow<T = string> = {
  key: T
  key_percent?: string
  name: string
  color?: string
  classNameTableHead?: string
  theadStyle?: string
  classNameTableBody?: string
  classNameText?: string
  statusCalled?: boolean
  component?: any
  typeValue?: string
  isHide?: boolean // hide io table listing
  defaultShow?: boolean
  options?: Option[]
  format?:
  | 'money'
  | 'date'
  | 'option'
  | 'percent'
  | 'phone'
  | 'link'
  | 'money-to-words'
  | 'color-picker'
  | 'number'
  typeDateFormat?: TypeDateFormat
  defaultProps?: AnyObject
  infoCreateEdit?: {
    className?: string
    placeholder?: string
    style?: string
    type?: HTMLInputTypeAttribute | 'money' | 'phone' | 'web_url' | 'percent'
    required?: boolean
    keyLabelOption?: string
    keyValueOption?: string
    typeComponent?: 'select' | 'input' | 'checkbox-rounded' | 'textarea' | 'color-picker'
    minDate?: string
    maxDate?: string
    component?: FC<any> | any
    dependencyApi?: string
    isHide?: boolean
    options?: Option[]
    disabled?: boolean
    column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 // column should be from 1 to 12 (column bootstrap)
    subTextWhenChecked?: string // using for checkbox rounded
    subTextWhenNoChecked?: string // using for checkbox rounded
    defaultValue?: any
    defaultProps?: AnyObject
    group?: 'account'
  }
  infoFilter?: {
    isFromTo?: boolean
    typeComponent?: 'select' | 'input' | 'checkbox'
    typeInput?: HTMLInputTypeAttribute
    component?: any
    keyLabelOption?: string
    keyValueOption?: string
    dependencyApi?: string
    noThereAreCommas?: boolean
    isSort?: boolean
    position?: number
    isCenter?: boolean
    options?: Option[]
    column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 // column should be from 1 to 12 (column bootstrap)
    isTwoColumnEachRow?: boolean // use for checkbox list
  }
  isLink?: boolean
  linkUrl?: string
  linkIdentifier?: string // default id
  linkLoanId?: string
}

export type TableConfig<T = string> = {
  settings?: {
    showAction?: boolean
    saveSESSION_NAME?: string
    showEditButton?: boolean
    showDeleteButton?: boolean
    showViewButton?: boolean
    showAddNewButton?: boolean
    textConfirmDelete?: string
    endPointDelete?: string
    endPointGetListing: string
    fieldDelete?: string
    messageDeleteError?: string
    messageDeleteSuccess?: string
    messageEditError?: string
    messageEditSuccess?: string
    messageCreateError?: string
    messageCreateSuccess?: string
    dependencies?: { [key: string]: string }
    buttonAddNew?: string
    showSearch?: boolean
    showMessageTitle?: string
    showFilter?: boolean
    endpoint?: string
    endpointNavigate?: string
    swalToastTitle?: string
    showRefresh?: boolean
    validation?: ObjectSchema<any>
    defaultSort?: T
    showCallButton?: boolean
    statusCalled?: boolean
  }
  rows: TableRow<T>[]
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  classShared?: string
  classInputWrap?: string
  insertLeft?: ReactNode
  insertRight?: ReactNode
  type?: HTMLInputTypeAttribute | 'money' | 'phone' | 'web_url' | 'percent'
  symbolMoney?: string
  symbolUrl?: string
  noThereAreCommas?: boolean
  showIconTogglePassword?: boolean
  error?: string
  symbolPhone?: string
  touched?: boolean
  transparent?: boolean
  classNameAdvanced?: string
  height46px?: boolean
  isSearchInterestedParty?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: { [key: string]: any }[]
  keyValueOption?: string
  keyLabelOption?: string
  error?: string
  touched?: boolean
  classShared?: string
  isOptionDefault?: boolean
  dropDownGroup?: boolean | undefined
  height46px?: boolean
  height55px?: boolean
  placeholder?: any
  border?: boolean;
  isMulti?: boolean
  isSearchable?: boolean
  menuPlacement?: string
  customStyles?: StylesConfig
  accCompanySelect?: boolean
}

export type CheckboxListingProps = {
  onChange: (info: PropsChangeFilterRow) => void
  values: any
  options: any[]
  className?: string
  row: FilterRow
  isTwoCol?: boolean
}

export type FilterRow<Key = string> = {
  key: Key
  name: string
  className?: string
  type: 'select' | 'input' | 'checkbox-multiple' | 'checkbox' | 'radio' | 'input-gte'
  isFromTo?: boolean
  options?: AnyObject[]
  defaultValue?: any
  defaultProps?: InputProps | SelectProps | CheckboxListingProps
}

export type PropsChangeFilterRow = {
  event: React.ChangeEvent<HTMLElement>
  typeFilter?:
  | 'equals'
  | 'gt'
  | 'gte'
  | 'in'
  | 'lt'
  | 'lte'
  | 'contains'
  | 'endsWith'
  | 'startsWith'
  | 'not'
  | 'notIn'
  row: FilterRow
}

export type MenuSettingItem = {
  activeKey: string
  title: string
  priority: number[]
  children: MenuChildren[]
  viewSetting?: any
}

type MenuChildren = {
  id: string
  to: string
  label: string
  priority: number[]
  viewSetting?: any
}

export type CheckboxTreeItem = {
  value: string
  label: string
  active?: boolean
  children?: CheckboxTreeItem[] & { [key: string]: any }
} & { [key: string]: any }

export type Option<T = any> = {
  label: string
  value: T
  default?: boolean
  backgroundColor?: string
  className?: string
  number_of_times_per_year?: number
  description?: string
}

export type DropDownGroup = {
  name: string
  options: Option[]
}

export type ID_TYPE_VALUE = 'singapore_nric_no' | 'foreign_identification_number'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  name: string
  label?: string
  desc?: string
  className?: string
  classNameLabel?: string
  classNameWrap?: string
  is_document?: boolean
  new_class_share?: boolean
  new_style?: boolean
}


export type ParamsCreateApplication = {
  isDraft?: boolean
  isBackStepOne?: boolean
  isDuplicateApplication?: boolean
}

export type ValidateFormApplication = {
  isCheckMlcb?: boolean
  callBackDeniedModalMlcb?: () => void
  callBackConfirmModalMlcb?: () => void
}

export type ActionAfterMlcbRes = 'approve' | 'next step' | 'go to step' | null

export type EmploymentStatus = 'EMP' | 'UNEMPINC' | 'UNEMP'

export type Avatar = {
  type: string
  base64: string
}


export type BadgeProps = {
  color: 'primary' | 'success' | 'warning' | 'danger'
  title: string
}

export type JwtDecode = {
  iat: number
  exp?: string
}

export type OrderBy = 'desc' | 'asc'

export type MenuProps<T = any> = {
  label: string
  value: string
  component?: FC<T>
}

export type Base64Item = {
  document_name: string
  base64: string
  size: number
  type: string
}

export type TypeFormControl = 'checkbox-rounded' | 'input'
export type TypeDate = 'MONTH' | 'WEEK' | 'DAY'

export type SessionStatus = null | 'open' | 'close'
export type ModalManagement<ModalName = string, ComponentProps = any> = {
  component: FC<ComponentProps>
  key: ModalName
}

export type PayloadGetListing<KeyFilter = any, keySort = string> = {
  filters?: KeyFilter
  pageSize?: number
  currentPage?: number
  is_active?: number
  deleted?: number
  orderBy?: 'asc' | 'desc'
  keySort?: keySort
  data?: any
  skip?: number // when u use skip,we will ignore pageSize
}

export type TypeDateFormat =
  | 'YYYY'
  | 'YYYY-MM-DD'
  | 'DD/MM/YYYY'
  | 'MMM DD, YYYY'
  | 'DD MMM, YYYY'
  | 'DD MMMM, YYYY'
  | 'ddd M/D'
  | 'MMMM YYYY'
  | 'MMM YYYY'
  | 'DD MMM, YYYY HH:mm:ss'
  | 'dddd'
  | 'YYYY-MM-DD hh:mm:ss'

export type ModalValidationStepContact = 'phone' | 'email'

export type ModalConfigItem<Key = string, ComponentProps = any> = {
  key: Key
  component: FC<ComponentProps>
}


export type User = {
  user_id?: number;
  company_id?: number;
  email?: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  role?: string;
  avatar?: string;
  status?: number;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  added_by?: number;
  last_login_at?: string;
  last_login_ip?: string;
}


export type UserType = {
  status?: string | any
  count?: number | any
}

export type CountryListing = {
  country_id?: number | any
  name?: string | any
  iso?: string | any
  nicename?: string | any
  iso3?: string | any
  numcode?: number | any
  phonecode?: number | any
  nationality?: string | any
}

interface Growth {
  sessions: number | any;
  score: number | any;
}

interface LastMonth {
  totalSessions: number;
  averageScore: number;
}

interface CurrentMonth {
  totalSessions: number;
  averageScore: string;
}

export type CompanyListingType = {
  company_id: number;
  company_name: string;
  registration_number: string;
  industry: string;
  description: string;
  email: string;
  phone: string;
  website: null | string;
  address: string;
  country_id: number;
  founded_date: null | string;
  ceo_name: null | string;
  employee_count: null | number;
  revenue: null | number;
  status: string;
  stock_symbol: null | string;
  linkedin_url: null | string;
  twitter_url: null;
  facebook_url: null | string;
  github_url: null | string;
  tags: null | string;
  company_logo: string;
  company_type: number;
  is_deleted: boolean;
  added_by: number;
  created_at: string;
  updated_at: string;
  updated_time: string
}

export type UserListingType = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  role: string;
  avatar: string;
  status: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  added_by: number;
  last_login_at: string;
  last_login_ip: string;
  company_id: number;
}

export type TotalCompanyDetails = {
  company_active: number;
  company_close: number;
  company_inactive: number;
  total_company: number
}

export type TotalUserDetails = {
  totalAllUsers: number;
  totalManagers: number;
  totalAdmins: number;
  totalAccountants: number;
  totalUsers: number
}

export type CompanyDetailsType = {
  company_id: number;
  company_name: string;
  registration_number: string;
  industry: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  country_id: number;
  founded_date: string;
  ceo_name: string;
  employee_count: number;
  revenue: number;
  status: string;
  stock_symbol: string;
  linkedin_url: string;
  twitter_url: null;
  facebook_url: string;
  github_url: string;
  tags: string;
  company_logo: string;
  company_type: number;
  is_deleted: boolean;
  added_by: number;
  created_at: string;
  updated_at: string;
  user: User[];
  total_document_upload: number
  website_url: string
  added_by_role: string
  document_remaining: number,
  xero_acc_id: string
  xero_access_token: string
  xero_refresh_token: string
  xero_token_expires_at: Date | string
  xero_client_id: string
  xero_tenant_id: string
  xero_client_secret: string
}

export type CompanyInfo = {
  company_id: number;
  company_name: string;
  registration_number: string;
  industry: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  country_id: number;
  founded_date: string;
  ceo_name: string;
  employee_count: number;
  revenue: number;
  status: string;
  stock_symbol: string;
  linkedin_url: string;
  twitter_url: null;
  facebook_url: string;
  github_url: string;
  tags: string;
  company_logo: string;
  company_type: number;
  is_deleted: boolean;
  added_by: number;
  created_at: string;
  updated_at: string;
}

export type BatchListing = {
  id: number
  batch_id: string;
  created_by: number;
  file_count: number;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
  file_done: number;
  company_id: number;
  user_created: string;
  company_name: string;
  total_done: string;
  company_logo: null;
  email_company: string;
  avatar?: string;
  role?: string;
  user_added_by?: string
}

export type BatchDetailsType = {
  id: number;
  batch_id: string;
  created_by: number;
  file_count: number;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
  file_done: number;
  company_id: number;
  s3_folder_name: string;
  transaction: Transaction[];
  company: CompanyInfo;
  company_logo?: string
  user: UserInfo
}

export type Transaction = {
  id: string;
  batch_id: number;
  po_number: string;
  file_name: string;
  request_data: string;
  response_data: string;
  created_at: string;
  updated_at: string;
  document_path: string;
  items_data: string;
  is_done: number;
  batch_number: string;
  company_id: number;
  retry_count: number;
  match_status: number;
  error_message: string;
  old_dex_po_status: string;
  company_name: string;
  invoice_number: string;
  s3_document_path: null;
  is_recheck: number;
  supplier_name: null;
  confident_score: number;
  conversation: ConversationDetails[],
  related_transactions: Transaction[],
  xero_sync_status: string;
  xero_synced_at: string;
  xero_invoice_id: string
}

export type ResponseData = {
  po_number?: string;
  invoice_number?: string;
  vendor_name?: string;
  vendor_address?: string;
  customer_name?: string;
  customer_billing_address?: string;
  customer_shipping_address?: string;
  items?: ItemsResponse[] | any;
  sub_total?: null;
  tax?: null;
  total?: string;
}

export type ItemsResponse = {
  id?: any;
  quantity?: string;
  product_description?: string;
  unit_price?: string;
  extension?: string;
}

export type PackageInfoType = {
  current_service: Currentservice;
  getServicePackage: GetServicePackage;
  document_remainning: number;
}

export type GetServicePackage = {
  package_id: number;
  package_name: string;
  package_type: string;
  document_amount: number;
  price: string;
  is_deleted: boolean;
}

export type Currentservice = {
  company_id: number;
  company_name: string;
  company_payment: Companypayment[];
  document_upload: number;
}

export type Companypayment = {
  payment_id: string;
  company_id: number;
  from_date: string;
  to_date: string;
  payment_term: string;
  amount: string;
  document_amount: string
  before_amount: number
  package_name: string
}

export type PackageListing = {
  package_id: number;
  package_name: string;
  package_type: string;
  document_amount: number;
  price: string;
  is_deleted: boolean;
}

export type ModalStepContactProps = {
  otp: string
  otpExpire: number
  setOtpExpire: Dispatch<SetStateAction<number>>
  showModal: () => void
  onSendOtp: () => Promise<void>
  data: PackageInfoType
  setOtp: Dispatch<SetStateAction<string>>
  service_id: number
  onRefreshData: () => void
  handleGetData: (company_id) => void
  sendOTP?: boolean
  setSendOTP?: Dispatch<SetStateAction<boolean>>
  sendOTPRenew?: boolean
  setSendOTPRenew?: Dispatch<SetStateAction<boolean>>
}
export type ManagerDashboardWorkspace = {
  user: UserManaging;
  accountant: AccountantManaging;
  company: CompanyManaging;
}

interface CompanyManaging {
  growth: number;
  total_company: number;
}

interface AccountantManaging {
  growth: number;
  total_accountant: number;
}

interface UserManaging {
  growth: number;
  total_user: number;
}
export type Message = {
  id: number;
  transaction_id: string;
  user_id: number;
  content: string;
  created_at: string;
  name: string;
  avatar: null;
}

export type ConversationDetails = {
  id: number;
  transaction_id: string;
  user_id: number;
  content: string;
  created_at: string;
}

export type TransactionStatusInfo = {
  total: number
  complete: number
  incomplete: number
}