import { Evaluation } from '../types';

const STORAGE_KEY = 'imageEvaluations';

export const saveEvaluation = (evaluation: Evaluation): void => {
  const evaluations = getEvaluations();
  evaluations.unshift(evaluation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
};

export const getEvaluations = (): Evaluation[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getEvaluationById = (id: string): Evaluation | undefined => {
  const evaluations = getEvaluations();
  return evaluations.find(evalItem => evalItem.id === id);
};
