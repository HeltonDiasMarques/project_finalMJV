import { Schema } from "mongoose";
import mongoose from "mongoose";
import moment from 'moment-timezone';

//Subtrai 3 horas do UTC para bater com o horário do Brasil
const now = moment.utc().subtract(3, 'hours');
const isoDateString = now.toISOString();

//Está interface representa um paciente no Banco de Dados, especifica quais campos seram inseridos 
export interface IPatient {
    name: string;
    age: string;
    treatment: string;
    password: string;
    document: string;
    address: string;
    phone: number;
    createdAt: string | Date;
}

// Esta é a estrutura do objeto que será armazenado no banco de dados para representar os pacientes. 
export const patientsSchema = new Schema<IPatient>({
    name: {
        type: String
    },
    age: {
        type: String
    },
    treatment: {
        type: String
    },
    password: {
        type: String
    },
    document: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: moment().tz(isoDateString).toDate()
    },
});

export const Patients = mongoose.model<IPatient>('Patients', patientsSchema);