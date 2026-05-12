import { parseArguments } from './utils/bmiUtils.ts';
/// <reference types="node" />

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try{
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log('Error, something bad happened, message: ', e.message);
    }
}