export type GeneralResponse = {
  error: boolean
  message: string
}

export interface CreateSuccessResponse extends GeneralResponse {
  id: number
}

export type ApprovalInfo = {
  id: number
  application_id: number
  approved_by: string
  approved_note: string
  created_at: Date
  updated_at: Date
  loan_id: number
  assignee_to: string | null
  user_check_approval?: string | null
}

export type RejectedInfo = {
  id: number
  rejection_type_id: number
  application_id: number
  rejected_by: string
  rejection_note: string
  created_at: string
  updated_at: string
  rejected_reason: string
}
