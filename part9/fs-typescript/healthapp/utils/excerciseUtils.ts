/// <reference types="node" />

export interface excerciseValues {
  target: number;
  daily: number[];
}

export const parseArguments = (args: string[]): excerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const daily = args.slice(3).map(day => Number(day));
  if (isNaN(target) || daily.some(day => isNaN(day))) {
    throw new Error('Provided values were not numbers!');
  }
  return {
    target,
    daily
  };
};