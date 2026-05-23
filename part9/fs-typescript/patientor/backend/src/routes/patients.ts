import express, { type Response, type Request, type NextFunction } from 'express';
import patientService from '../services/patientService.ts';
import { type nonSSNPatient, type Patient, NewPatientSchema} from '../types.ts';
import { z } from 'zod';
// import parseNewPatient from '../utils.ts';

const router = express.Router();
const patients = patientService.getPatients();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};



router.get('/', (_req, res: Response<nonSSNPatient[]>) => {
  const data = patients.map(({id, name, dateOfBirth, gender, occupation, entries})=>({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
  res.send(data);
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient>) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).end();
  }
});


router.post('/', newPatientParser, (req: Request<unknown, unknown, Patient>, res: Response<Patient>) => {
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

router.post('/:id/entries', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try{
    const newEntry = patientService.addEntry(id, req.body);
    if (newEntry) {
      res.status(201).json(newEntry);
    } else {
      res.status(404).json({ error: `Patient with id ${id} not found` });
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(500).json({ error: 'An unexpected application exception occurred.' });
    }
  }
});

router.use(errorMiddleware);
export default router;

