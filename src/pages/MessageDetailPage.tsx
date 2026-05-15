import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { submissionsApi } from '@/api/submissions'
import { StatusChip } from '@/components/StatusChip'
import type { SubmissionStatus } from '@/types/submission'

export function MessageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['submission', id],
    queryFn: () => submissionsApi.getById(id!),
    enabled: !!id,
  })

  const [status, setStatus] = useState<SubmissionStatus | ''>('')
  const [adminNotes, setAdminNotes] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (data) {
      setStatus(data.status)
      setAdminNotes(data.adminNotes ?? '')
    }
  }, [data])

  const mutation = useMutation({
    mutationFn: () =>
      submissionsApi.update(id!, {
        status: (status as SubmissionStatus) || undefined,
        adminNotes: adminNotes || null,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['submissions'] })
      qc.invalidateQueries({ queryKey: ['submission', id] })
      setSaved(true)
    },
  })

  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" height={300} sx={{ mt: 2 }} />
      </Box>
    )
  }

  if (isError || !data) {
    return <Alert severity="error">Nie można załadować wiadomości.</Alert>
  }

  return (
    <Box maxWidth={800}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/messages')}
        sx={{ mb: 2 }}
      >
        Powrót do listy
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" fontWeight={700}>{data.name}</Typography>
            <Typography variant="body2" color="text.secondary">{data.email}</Typography>
          </Box>
          <StatusChip status={data.status} />
        </Box>

        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          <Chip label={`Źródło: ${data.source}`} size="small" variant="outlined" />
          <Chip label={`Typ: ${data.messageType}`} size="small" variant="outlined" />
          <Chip
            label={`Data: ${new Date(data.createdAt).toLocaleString('pl-PL')}`}
            size="small"
            variant="outlined"
          />
          {data.repliedAt && (
            <Chip
              label={`Odpowiedziano: ${new Date(data.repliedAt).toLocaleString('pl-PL')}`}
              size="small"
              color="success"
              variant="outlined"
            />
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Wiadomość
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {data.message}
        </Typography>

        {data.additionalProperties && Object.keys(data.additionalProperties).length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Dodatkowe pola
            </Typography>
            {Object.entries(data.additionalProperties).map(([key, val]) => (
              <Box key={key} display="flex" gap={1} mb={0.5}>
                <Typography variant="body2" fontWeight={600}>{key}:</Typography>
                <Typography variant="body2">{String(val)}</Typography>
              </Box>
            ))}
          </>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Akcje admina
        </Typography>

        <FormControl size="small" fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value as SubmissionStatus)}
          >
            <MenuItem value="New">Nowa</MenuItem>
            <MenuItem value="Read">Przeczytana</MenuItem>
            <MenuItem value="Replied">Odpowiedziano</MenuItem>
            <MenuItem value="Archived">Archiwum</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Notatki admina"
          multiline
          rows={4}
          fullWidth
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          sx={{ mb: 2 }}
        />

        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>Błąd zapisu. Spróbuj ponownie.</Alert>
        )}

        <Button
          variant="contained"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Zapisywanie…' : 'Zapisz zmiany'}
        </Button>
      </Paper>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        message="Zmiany zapisane"
      />
    </Box>
  )
}
