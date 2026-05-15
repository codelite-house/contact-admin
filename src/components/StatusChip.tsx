import { Chip } from '@mui/material'
import type { SubmissionStatus } from '@/types/submission'

const STATUS_CONFIG: Record<SubmissionStatus, { label: string; color: 'default' | 'error' | 'warning' | 'success' | 'info' }> = {
  New: { label: 'Nowa', color: 'error' },
  Read: { label: 'Przeczytana', color: 'warning' },
  Replied: { label: 'Odpowiedziano', color: 'success' },
  Archived: { label: 'Archiwum', color: 'default' },
}

export function StatusChip({ status }: { status: SubmissionStatus }) {
  const { label, color } = STATUS_CONFIG[status] ?? { label: status, color: 'default' }
  return <Chip label={label} color={color} size="small" />
}
