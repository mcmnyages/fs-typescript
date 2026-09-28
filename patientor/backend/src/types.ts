export interface DiagnosesTypes {
    code:String,
    name:String,
    latin?:String
}

// type Gender = 'Male'| 'Female' |'Other'

export interface PatientTypes{
    id:String
    name:String
    dateOfBirth:String
    ssn:String
    gender:String
    occupation:String
}
export type NonSensitivePatient = Omit<PatientTypes, "ssn">;
