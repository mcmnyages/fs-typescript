import patients from '../../data/patients.ts'
import type { NonSensitivePatient } from '../types.ts'

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(p => ({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation
    }))
}

export default {
    getPatients
}
