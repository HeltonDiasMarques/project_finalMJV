import { Router } from "express";
import healthRouter from './health.router';
import patientsRouter from './patients.router';
import medicationsRouter from './medications.router'

const router = Router();

router.use('/health', healthRouter);
router.use('/patients', patientsRouter);
router.use('/medications', medicationsRouter)

export default router;