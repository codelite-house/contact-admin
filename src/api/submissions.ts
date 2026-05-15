import apiClient from '@/lib/api'
import type {
  SubmissionsPageDto,
  SubmissionDto,
  UpdateSubmissionRequest,
  ContactMessageType,
  SubmissionStatus,
} from '@/types/submission'

export interface GetSubmissionsParams {
  page?: number
  pageSize?: number
  source?: string
  messageType?: ContactMessageType
  status?: SubmissionStatus
}

export const submissionsApi = {
  getAll: (params: GetSubmissionsParams = {}) =>
    apiClient.get<SubmissionsPageDto>('/api/v1/admin/messages', { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<SubmissionDto>(`/api/v1/admin/messages/${id}`).then((r) => r.data),

  update: (id: string, body: UpdateSubmissionRequest) =>
    apiClient.patch<SubmissionDto>(`/api/v1/admin/messages/${id}`, body).then((r) => r.data),
}
