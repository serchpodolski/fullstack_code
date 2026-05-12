import { parseArguments } from './utils/excerciseUtils.ts';
/// <reference types="node" />

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExcercises = (daily: number[], target: number): Result => {
  const periodLength = daily.length;
  const trainingDays = daily.filter(day => day > 0).length;
  const average = daily.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating;
  let ratingDescription;
  if (success) {
    rating = 3;
    ratingDescription = 'great work! Keep it up!'; 
  } else if (average / target > 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  else {
    rating = 1;
    ratingDescription = 'bad';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try{
  const { target, daily } = parseArguments(process.argv);
  console.log(calculateExcercises(daily, target));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  }
}