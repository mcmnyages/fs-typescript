import type { Entry } from '../../types';
import { Box, Typography, Chip } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

// Color mapping for health check rating levels (0: Healthy, 1: LowRisk, 2: HighRisk, 3: Critical)
const getHealthCheckColor = (rating: number) => {
  switch (rating) {
    case 0: return 'success';
    case 1: return 'info';
    case 2: return 'warning';
    case 3: return 'error';
    default: return 'default';
  }
};

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1.5, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LocalHospitalIcon color="error" fontSize="small" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Hospitalization
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>Discharge Date:</strong> {entry.discharge.date}
          </Typography>
          <Typography variant="body2">
            <strong>Discharge Criteria:</strong> {entry.discharge.criteria}
          </Typography>
        </Box>
      );

    case 'OccupationalHealthcare':
      return (
        <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1.5, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <WorkIcon color="primary" fontSize="small" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Occupational Healthcare ({entry.employerName})
            </Typography>
          </Box>
          {entry.sickLeave && (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </Typography>
          )}
        </Box>
      );

    case 'HealthCheck':
      return (
        <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1.5, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <FavoriteIcon color="error" fontSize="small" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Health Check
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="body2"><strong>Rating:</strong></Typography>
            <Chip
              label={`Level ${entry.healthCheckRating}`}
              size="small"
              color={getHealthCheckColor(entry.healthCheckRating) as 'success' | 'info' | 'warning' | 'error' | 'default'}
            />
          </Box>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;