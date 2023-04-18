import { Schema } from "mongoose";
import mongoose from "mongoose";
import moment from 'moment-timezone';

const now = moment.utc().subtract(3, 'hours');
const isoDateString = now.toISOString();

export interface IMedication {
    name: string;
    registry: string;
    medication: string;
    marking: string;
    validity: string;
    password: string;
    createdAt: string | Date;
}

export const medicationSchema = new Schema<IMedication>({
    registry: {
        type: String
    },
    name: {
        type: String
    },
    medication: {
        type: String
    },
    marking: {
        type: String
    },
    validity: {
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: moment().tz(isoDateString).toDate()
    },
});

export const Medications = mongoose.model<IMedication>('Medications', medicationSchema);