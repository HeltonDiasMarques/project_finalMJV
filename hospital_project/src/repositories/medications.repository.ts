import { IMedication, Medications } from "../models/medications.model";

class MedicationsRepository {
    getAll () {
        return Medications.find();
    }

    getByRegistry(registry: string){
        return Medications.findOne({ registry: registry });
    }

    getByMarking(marking: string) {
        return Medications.findOne({ marking: marking });
    }

    create(medications: IMedication){
        return Medications.create(medications);
    }

    update(registry: string, medications: IMedication){
        return Medications.updateOne({ registry: registry }, { $set: medications });
    }

    remove(registry: string){
        return Medications.deleteOne({ registry: registry });
    }
}

export default new MedicationsRepository(); 