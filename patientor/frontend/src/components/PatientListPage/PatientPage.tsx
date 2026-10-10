import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import type { Patient } from '../../types';

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

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        patient.entries.map((entry, index) => (
          <div key={index}>{JSON.stringify(entry)}</div>
        ))
      )}
    </div>
  );
};

export default PatientPage;
