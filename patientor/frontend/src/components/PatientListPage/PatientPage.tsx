import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosisService';
import type { Patient, Diagnosis } from '../../types';
import Entries from '../Entries';
import { Container, Typography, Box, Paper, CircularProgress, Alert, Avatar, Divider, Grid } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        if (!id) return;

        const fetchDiagnoses = async () => {
            const fetchedDiagnoses = await diagnosisService.getAll();
            setDiagnoses(fetchedDiagnoses);
        };
        void fetchDiagnoses();

        patientService
            .getById(id)
            .then(setPatient)
            .catch(() => setError('Failed to fetch patient information'));
    }, [id]);

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!patient) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const getGenderIcon = (gender: string) => {
        switch (gender.toLowerCase()) {
            case 'male':
                return <MaleIcon color="primary" />;
            case 'female':
                return <FemaleIcon color="secondary" />;
            default:
                return <TransgenderIcon />;
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                {/* Header section with Avatar and Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '1.75rem', fontWeight: 'bold' }}>
                        {patient.name.charAt(0)}
                    </Avatar>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                                {patient.name}
                            </Typography>
                            {getGenderIcon(patient.gender)}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            SSN: {patient.ssn}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Patient Details Grid */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="body2" color="text.secondary">Occupation</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{patient.occupation}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{patient.dateOfBirth}</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Entries entries={patient.entries} diagnoses={diagnoses} />
            </Paper>
        </Container>
    );
};

export default PatientPage;