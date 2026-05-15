export type ContactMessageType =
  | 'General'
  | 'Support'
  | 'Sales'
  | 'Partnership'
  | 'Other'

export type SubmissionStatus = 'New' | 'Read' | 'Replied' | 'Archived'

export interface SubmissionDto {
  id: string
  name: string
  email: string
  message: string
  source: string
  messageType: ContactMessageType
  additionalProperties: Record<string, unknown> | null
  status: SubmissionStatus
  createdAt: string
  repliedAt: string | null
  adminNotes: string | null
}

export interface SubmissionsPageDto {
  items: SubmissionDto[]
  totalCount: number
  page: number
  pageSize: number
}

export interface UpdateSubmissionRequest {
  status?: SubmissionStatus
  adminNotes?: string | null
}
