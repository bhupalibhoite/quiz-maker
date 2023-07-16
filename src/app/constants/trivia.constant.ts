import { DataLimit, DataType } from "../enums/trivia.enum";

export interface TriviaDTO {
  id: number;
  name: string;
}

export interface Trivia {
  trivia_categories: TriviaDTO[];
}


export interface QuizResponse {
  response_code: number;
  results: QuizQuestion[];
  selectedOptions: SelectedOptionsDTO;
}

export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  displayOptions: string[];
}

export interface QueryParamData {
  [key: string]: string | number;
  amount: DataLimit;
  category: number;
  difficulty: string;
  type: DataType;
}

export interface SelectedOptionsDTO {
  [key: string]: number;
}
