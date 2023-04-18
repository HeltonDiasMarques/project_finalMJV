import PatientsRepository from "../repositories/patients.repository";
import { IPatient, Patients } from "../models/patients.model";
import bcrypet from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class PatientsService {
    //Chama a função getAllPatients do PatientsRepository 
    getAllPatients() {
        return PatientsRepository.getAllPatients();
    }

    //Chama a função getByTreatment do PatientsRepository 
    getByTreatment(treatment: string) {
        return PatientsRepository.getByTreatment(treatment);
    }

    //Chama a função getByName do PatientsRepository 
    getByName(name: string) {
        return PatientsRepository.getByName(name);
    }

    //Cria um novo paciente juntamente com o "treatment" dele, além de criptografar a senha do paciente usando a biblioteca bcrypt antes de salvá-la no banco de dados
    async create(patients: IPatient) {
        const count = await Patients.countDocuments();
        patients.treatment = (count + 1).toString();

        if (patients.password) {
            patients.password = await bcrypet.hash(patients.password, 10);
        }
        return PatientsRepository.create(patients);
    }

    /*Usada para autenticar um paciente, ele recebe um paciente com o treatment e senha, então ele busca um paciente 
    com o memso treatment no banco de dados e compara a senha informada com a senha criptografada armazenada no banco de dados. 
    Se a senha estiver correta, ele retorna um token JWT assinado com o número de treatment do paciente e o seu ID. 
    Se a senha estiver incorreta, ele gera uma exceção*/
    async authorization(treatment: string, password: string) {
        const patients = await PatientsRepository.getByTreatment(treatment);

        if (!patients) throw new Error('Paciente não cadastrado!');

        const result = await bcrypet.compare(password, patients.password);

        if (result) {
            return jwt.sign({ treatment: patients.treatment, _id: patients._id }, secretJWT, {
                expiresIn: '5h'
            })
        };

        throw new Error('Falha na autenticação, senha incorreta!');
    }

    //Responavel por remover os pacientes do Banco de Dados, chamando a função remove do repositório.
    remove(treatment: string) {
        return PatientsRepository.remove(treatment);
    }

    //Responavel por atualizar um paciente do Banco de Dados, chamando a função update do repositório.
    update(treatment: string, patients: IPatient) {
        return PatientsRepository.update(treatment, patients);
    }
}

export default new PatientsService();