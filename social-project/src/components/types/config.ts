export type AddressTypeItem = {
  id: number
  address_type_name: string
  description: string
  status: number
  delete_at: string | null
  deleted: number
  is_default: number
}

export type CompanyItem = {
  id: number
  company_name: string
  company_code: string
  business_uen: string
  telephone: string
  email: string
  status: number
  address: string
  delete_at: string
  deleted: number
  open_date: string
  parent_id: number
  contact_person: string
  license_no: string
  license_expiry_date: string
  web_url: string
  trun_on_money: number
  min_amount_approval: string
  mlcb_client_id: string
  closing_time: string
}

export type DocumentTypeItem = {
  id: number
  type_name: string
  description: string
  status: number
  created_date: string
  updated_date: string
  delete_at: string
  deleted: number
  is_default: number
}
