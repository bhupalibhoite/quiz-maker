import { Injectable } from '@angular/core';
import { QuizResponse } from 'src/app/constants/trivia.constant';

@Injectable({
  providedIn: 'root'
})
export class QuizDataService {
  private quizData!: QuizResponse;

  constructor() { }

  setQuizData(data: QuizResponse) {
    this.quizData = data;
  }

  getQuizData(): QuizResponse {
    return this.quizData;
  }
}
