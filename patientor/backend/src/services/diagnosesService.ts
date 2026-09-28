import diagnoses from '../../data/diagnoses.ts'
import { type DiagnosesTypes } from '../types.ts'


const getDiagnoses=(): DiagnosesTypes[]=>{
    return diagnoses
}

export default{
    getDiagnoses
}