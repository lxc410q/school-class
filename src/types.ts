export type EvaluationType = 'evaluation' | 'inspiration';

export interface Evaluation {
  id: string;
  imageUrl: string;
  comment: string;
  date: string;
  timestamp: number;
  type: EvaluationType;
}
