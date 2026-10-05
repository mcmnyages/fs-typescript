import { Gender, type NewPatient } from './types.ts';

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const isGender = (param: string): param is Gender => {
    return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const parseNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object
    ) {
        const newPatient: NewPatient = {
            name: object.name as string,
            dateOfBirth: object.dateOfBirth as string,
            ssn: object.ssn as string,
            gender: parseGender(object.gender),
            occupation: object.occupation as string
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatient;
