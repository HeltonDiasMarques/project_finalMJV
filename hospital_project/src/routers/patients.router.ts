import { Request, Response, Router } from "express";
import PatientsService from "../services/patients.service";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";
const router = Router();

//Responsavel por apresentar os pacientes presentes na lista
router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        const patients = await PatientsService.getAllPatients();
        res.status(200).send(patients);
      } catch (error: any) {
        res.status(500).send({ message: error.message });
      }
    });

//Responsavel por pesquisar algum paciente especifico utilizando o Atendimento
router.get('/treatment/:treatment', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
      const patient = await PatientsService.getByTreatment(req.params.treatment);
      if (!patient) return res.status(404).send({ message: 'Paciente não encontrado!' });
      res.status(200).send(patient);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

//Responsavel por pesquisar algum paciente especifico utilizando o Nome
router.get('/name/:name', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
      const patient = await PatientsService.getByName(req.params.name);
      if (!patient) return res.status(404).send({ message: 'Não há pacientes com este nome informado!' });
      res.status(200).send(patient);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

//Responsabel por criar um novo paciente e definir se é pediatrico ou não
router.post('/', authorizationMiddleware, async (req: Request, res: Response) => {
    if (req.body.age <= 13) {
        await PatientsService.create(req.body);
        res.status(201).send({ message: 'Paciente cadastrado, mas poderá ser internado apenas na pediatria!' })
    }
    await PatientsService.create(req.body);
    res.status(201).send({ message: 'Paciente cadastrado com sucesso!' });
});

//responsavel por realizar pela a autenticação
router.post('/authorization', async (req: Request, res: Response) => {
    try {
        const token = await PatientsService.authorization(req.body.treatment, req.body.password);
        res.status(200).send({ token });
    } catch (error: any) {
        ;
        res.status(401).send({ message: error.message });
    }
});

//Responsavel por deletar pacientes 
router.delete('/remove/:treatment', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
      const deletedPatient = await PatientsService.remove(req.params.treatment);
      if (!deletedPatient) return res.status(404).send({ message: 'Paciente não encontrado!' });
      res.status(200).send({ message: "Paciente removido com sucesso!" });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

//Responsavel por atualizar o cadastro dos pacientes
router.put('/:treatment', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
      const updatedPatient = await PatientsService.update(req.params.treatment, req.body);
      if (!updatedPatient) return res.status(404).send({ message: 'Paciente não encontrado!' });
      res.status(200).send({ message: 'Paciente atualizado com sucesso!' });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

export default router;
