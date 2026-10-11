import type { Diagnosis, Entry } from '../../types';
import EntryDetails from './EntryDetails';
import { Card, CardContent, Typography, Box, Chip, Divider } from '@mui/material';

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const Entries = ({ entries, diagnoses }: Props) => {
  if (entries.length === 0) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>Entries</Typography>
        <Typography variant="body2" color="text.secondary">No medical entries recorded.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Entries
      </Typography>

      {entries.map(entry => (
        <Card key={entry.id} variant="outlined" sx={{ mb: 2.5, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {entry.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specialist: <strong>{entry.specialist}</strong>
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {entry.description}
            </Typography>

            <EntryDetails entry={entry} />

            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Diagnoses
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {entry.diagnosisCodes.map(code => {
                    const diagnosis = diagnoses.find(d => d.code === code);
                    return (
                      <Chip
                        key={code}
                        label={`${code}: ${diagnosis?.name ?? 'Unknown diagnosis'}`}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    );
                  })}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Entries;