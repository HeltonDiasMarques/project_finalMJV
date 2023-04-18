import { Request, Response, Router } from "express";
import MedicationsService from "../services/medications.service"
import { authorizationMiddleware } from "../middlewares/authorization.middleware";

const router = Router();

//Responsavel por apresentar os pacientes presentes na lista
router.get('/', authorizationMiddleware, async (req: Request, res: Response) => {
    const medications = await MedicationsService.getAll();
    res.send(medications);
});

//Responsavel por pesquisar algum paciente especifico utilizando o Atendimento
router.get('/getregistry/:registry', authorizationMiddleware, async (req: Request, res: Response) => {
    const medications = await MedicationsService.getByRegistry(req.params.registry);
    if (!medications) return res.status(400).send({ message: 'Medicação não encontrado!' });
    res.status(200).send(medications);
});

//Responsavel por pesquisar algum paciente especifico utilizando o Atendimento
router.get('/getmarking/:marking', authorizationMiddleware, async (req: Request, res: Response) => {
    const medications= await MedicationsService.getByMarking(req.params.marking);
    if (!medications) return res.status(400).send({ message: 'Não há medicações desta marca no momento!' });
    res.status(200).send(medications);
});

//Responsabel por criar um novo paciente e definir se é pediatrico ou não
router.post('/', authorizationMiddleware, async (req: Request, res: Response) => {
    await MedicationsService.create(req.body);
    res.status(201).send({ message: 'Medicação cadastrado com sucesso!' });
});

//responsavel por realizar pela a autenticação
router.post('/authorization', async (req: Request, res: Response) => {
    try {
        const token = await MedicationsService.authorization(req.body.registry, req.body.password);
        res.status(200).send({ token });
    } catch (error: any) {
        res.status(401).send({ message: error.message });
    }
});

//Responsavel por deletar pacientes 
router.delete('/remove/:registry', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await MedicationsService.remove(req.params.registry);
        res.status(200).send({ message: "Medicação removido com sucesso!" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

//Responsavel por atualizar o cadastro dos pacientes
router.put('/:registry', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await MedicationsService.update(req.params.treatment, req.body);
        res.status(200).send({ message: 'Medicação atualizado com sucesso!' });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

export default router;