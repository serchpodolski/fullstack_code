import express, { type Response } from 'express';
import diagnosesService from '../services/diagnosesServices.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    const data = diagnosesService.getDiagnoses();
    res.send(data);
});

export default router;