import { useState, SyntheticEvent } from 'react';
import { Box, TextField, Button, Typography, Alert, MenuItem, Paper, Divider, Autocomplete } from '@mui/material';
import axios from 'axios';
import type { Entry, EntryWithoutId, Diagnosis } from '../../types';
import patientService from '../../services/patients';

interface Props {
  patientId: string;
  diagnoses: Diagnosis[];
  onEntryAdded: (newEntry: Entry) => void;
  onCancel: () => void;
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const AddEntryForm = ({ patientId, diagnoses, onEntryAdded, onCancel }: Props) => {
  const [type, setType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // Type-specific states
  const [healthCheckRating, setHealthCheckRating] = useState('0');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const [error, setError] = useState<string | null>(null);

  const submitNewEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError(null);

    try {
      let entryData: EntryWithoutId;

      const baseEntryData = {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
      };

      switch (type) {
        case 'HealthCheck':
          entryData = {
            ...baseEntryData,
            type: 'HealthCheck',
            healthCheckRating: Number(healthCheckRating) as 0 | 1 | 2 | 3,
          };
          break;

        case 'Hospital':
          entryData = {
            ...baseEntryData,
            type: 'Hospital',
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          break;

        case 'OccupationalHealthcare':
          entryData = {
            ...baseEntryData,
            type: 'OccupationalHealthcare',
            employerName,
            sickLeave:
              sickLeaveStartDate && sickLeaveEndDate
                ? {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate,
                  }
                : undefined,
          };
          break;

        default:
          return;
      }

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
        New Patient Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={submitNewEntry} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Entry Type Selector */}
        <TextField
          select
          label="Entry Type"
          value={type}
          onChange={({ target }) => setType(target.value as EntryType)}
          fullWidth
          required
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        </TextField>

        {/* Common Fields */}
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

        {/* Diagnosis Codes Autocomplete Picker */}
        <Autocomplete
          multiple
          options={diagnoses}
          getOptionLabel={(option) => `${option.code} — ${option.name}`}
          value={diagnoses.filter((d) => diagnosisCodes.includes(d.code))}
          onChange={(_, selectedDiagnoses) => {
            setDiagnosisCodes(selectedDiagnoses.map((d) => d.code));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Diagnosis Codes"
              placeholder="Select diagnosis codes"
            />
          )}
          fullWidth
        />

        <Divider sx={{ my: 1 }} />

        {/* Dynamic Fields based on Type */}
        {type === 'HealthCheck' && (
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
        )}

        {type === 'Hospital' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Discharge Details</Typography>
            <TextField
              label="Discharge Date"
              type="date"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              variant="outlined"
              fullWidth
              required
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </Box>
        )}

        {type === 'OccupationalHealthcare' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Employer Name"
              variant="outlined"
              fullWidth
              required
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 1 }}>Sick Leave (Optional)</Typography>
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </Box>
        )}

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
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