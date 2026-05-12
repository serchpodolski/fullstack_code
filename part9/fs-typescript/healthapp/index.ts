import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExcercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req,res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).send({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(height, weight);

  return res.send({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: daily, target } = req.body;

  if (!daily || !target || !Array.isArray(daily)) {
    return res.status(400).send({
      error: 'parameters missing'
    });
  }

  const dailyNumbers = daily.map((day: unknown) => Number(day));

  if (dailyNumbers.some(day => isNaN(day)) || isNaN(Number(target))) {
    return res.send({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExcercises(dailyNumbers, Number(target));

  return res.send(result);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;