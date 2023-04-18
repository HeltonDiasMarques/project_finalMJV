import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const healthCheck = { message: 'Aplicação está funcionando!'}
    res.send(healthCheck)
});

router.get('/check', (req: Request, res: Response)=> {
    const healthCheck = { message: 'Aplicação está funcionou com sucesso!'}
    res.send(healthCheck)
});

export default router;