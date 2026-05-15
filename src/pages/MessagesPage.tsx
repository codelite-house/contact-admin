import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { submissionsApi } from '@/api/submissions'
import { StatusChip } from '@/components/StatusChip'
import type { ContactMessageType, SubmissionStatus } from '@/types/submission'

const PAGE_SIZE = 20

export function MessagesPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [source, setSource] = useState('')
  const [messageType, setMessageType] = useState<ContactMessageType | ''>('')
  const [status, setStatus] = useState<SubmissionStatus | ''>('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['submissions', page, source, messageType, status],
    queryFn: () =>
      submissionsApi.getAll({
        page,
        pageSize: PAGE_SIZE,
        source: source || undefined,
        messageType: (messageType as ContactMessageType) || undefined,
        status: (status as SubmissionStatus) || undefined,
      }),
  })

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Wiadomości kontaktowe
      </Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Źródło"
          size="small"
          value={source}
          onChange={(e) => { setSource(e.target.value); setPage(1) }}
          sx={{ minWidth: 160 }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Typ</InputLabel>
          <Select
            value={messageType}
            label="Typ"
            onChange={(e) => { setMessageType(e.target.value as ContactMessageType | ''); setPage(1) }}
          >
            <MenuItem value="">Wszystkie</MenuItem>
            <MenuItem value="General">Ogólna</MenuItem>
            <MenuItem value="Support">Wsparcie</MenuItem>
            <MenuItem value="Sales">Sprzedaż</MenuItem>
            <MenuItem value="Partnership">Partnerstwo</MenuItem>
            <MenuItem value="Other">Inne</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => { setStatus(e.target.value as SubmissionStatus | ''); setPage(1) }}
          >
            <MenuItem value="">Wszystkie</MenuItem>
            <MenuItem value="New">Nowa</MenuItem>
            <MenuItem value="Read">Przeczytana</MenuItem>
            <MenuItem value="Replied">Odpowiedziano</MenuItem>
            <MenuItem value="Archived">Archiwum</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isError && <Alert severity="error" sx={{ mb: 2 }}>Błąd ładowania wiadomości.</Alert>}

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Imię i nazwisko</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Źródło</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Wiadomość</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}><Skeleton /></TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.items.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    onClick={() => navigate(`/messages/${item.id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {new Date(item.createdAt).toLocaleString('pl-PL')}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.source}</TableCell>
                    <TableCell>{item.messageType}</TableCell>
                    <TableCell><StatusChip status={item.status} /></TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 300,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.message}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
          />
        </Box>
      )}

      {!isLoading && data?.totalCount === 0 && (
        <Typography color="text.secondary" textAlign="center" mt={4}>
          Brak wiadomości.
        </Typography>
      )}
    </Box>
  )
}
