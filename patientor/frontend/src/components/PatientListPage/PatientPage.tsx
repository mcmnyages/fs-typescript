import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import type { Patient } from '../../types';
import Entries from './Entries';

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        patientService
            .getById(id)
            .then(setPatient)
            .catch(() => setError('Failed to fetch patient information'));
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!patient) {
        return <p>Loading patient information...</p>;
    }

    return (
        <div>
            <h2>{patient.name}</h2>

            <p><strong>SSN:</strong> {patient.ssn}</p>
            <p><strong>Occupation:</strong> {patient.occupation}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Date of birth:</strong> {patient.dateOfBirth}</p>

            <Entries entries={patient.entries} />
        </div>
    );

};

export default PatientPage;
