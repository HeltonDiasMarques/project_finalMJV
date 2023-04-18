import { IPatient, Patients } from "../models/patients.model";

class PatientsRepository {
    //Retorna todos os pacientes no banco de dados.
    getAllPatients () {
        return Patients.find();
    }

    //Retorna retorna o primeiro paciente que corresponde ao tratamento específico fornecido como argumento.
    getByTreatment(treatment: string){
        return Patients.findOne({ treatment: treatment });
    }

    //Retorna o primeiro paciente que corresponde ao nome fornecido como argumento.
    getByName(name: string) {
        return Patients.findOne({ name: name });
    }
    
    //Cria um novo paciente no banco de dados e retorna o objeto de paciente criado.
    create(patients: IPatient){
        return Patients.create(patients);
    }

    //Atualiza o paciente que corresponde ao tratamento específico fornecido como argumento e retorna o objeto de paciente atualizado.
    update(treatment: string, patients: IPatient){
        return Patients.updateOne({ treatment: treatment }, { $set: patients });
    }

    // remove o paciente que corresponde ao tratamento específico fornecido como argumento e retorna se o objeto foi removido.
    remove(treatment: string){
        return Patients.deleteOne({ treatment: treatment });
    }
}

export default new PatientsRepository(); 