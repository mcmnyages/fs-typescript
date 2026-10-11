import { useState, SyntheticEvent } from 'react';
import { Box, TextField, Button, Typography, Alert, MenuItem, Paper } from '@mui/material';
import axios from 'axios';
import type { Entry, EntryWithoutId } from '../../types';
import patientService from '../../services/patients';

interface Props {
  patientId: string;
  onEntryAdded: (newEntry: Entry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ patientId, onEntryAdded, onCancel }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('0');
  const [error, setError] = useState<string | null>(null);

  const submitNewEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const entryData: EntryWithoutId = {
        type: 'HealthCheck',
        description,
        date,
        specialist,
        healthCheckRating: Number(healthCheckRating) as 0 | 1 | 2 | 3,
      };

      const addedEntry = await patientService.addEntry(patientId, entryData);
      onEntryAdded(addedEntry);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (typeof e.response?.data === 'string') {
          setError(e.response.data);
        } else if (e.response?.data && typeof e.response.data === 'object' && 'error' in e.response.data) {
          setError(String(e.response.data.error));
        } else {
          setError('Failed to add entry. Please check your input values.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: 'background.default' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        New Health Check Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={submitNewEntry} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Specialist"
          variant="outlined"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <TextField
          select
          label="Health Check Rating"
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
          fullWidth
          required
        >
          <MenuItem value="0">0 - Healthy</MenuItem>
          <MenuItem value="1">1 - Low Risk</MenuItem>
          <MenuItem value="2">2 - High Risk</MenuItem>
          <MenuItem value="3">3 - Critical</MenuItem>
        </TextField>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" color="primary">
            Add
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddEntryForm;