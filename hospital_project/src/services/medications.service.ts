import MedicationsRepository from "../repositories/medications.repository";
import { IMedication, Medications } from "../models/medications.model";
import bcrypet from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class MedicationsService {
    getAll() {
        return MedicationsRepository.getAll();
    }

    getByRegistry(registry: string) {
        return MedicationsRepository.getByRegistry(registry);
    }

    getByMarking(marking: string) {
        return MedicationsRepository.getByMarking(marking);
    }

    async create(medications: IMedication) {
        const count = await Medications.countDocuments();
        medications.registry = (count + 1).toString();
        
        if (medications.password) {
            medications.password = await bcrypet.hash(medications.password, 10);
        }
        return MedicationsRepository.create(medications);
    }

    async authorization(registry: string, password: string) {
        const medications = await MedicationsRepository.getByRegistry(registry);

        if (!medications) throw new Error('Medicação não cadastrado!');

        const result = await bcrypet.compare(password, medications.password);

        if (result) {
            return jwt.sign({ registry: medications.registry, _id: medications._id }, secretJWT, {
                expiresIn: '5h'
            })
        };

        throw new Error('Falha na autenticação, senha incorreta!');
    }

    remove(registry: string) {
        return MedicationsRepository.remove(registry);
    }

    update(registry: string, medications: IMedication) {
        return MedicationsRepository.update(registry, medications);
    }
}

export default new MedicationsService();