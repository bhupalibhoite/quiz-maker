import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/app/constants/apiUrl.constant';
import { Observable } from 'rxjs';
import { QuizResponse, Trivia } from 'src/app/constants/trivia.constant';

@Injectable({
  providedIn: 'root',
})
export class TriviaApiService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Trivia> {
    return this.http.get<Trivia>(encodeURI(APIURL.getTriviaCategory));
  }

  getQuizQuestions(querystring: string): Observable<QuizResponse> {
    const baseUrl = 'https://opentdb.com/api.php';
    const quizQuestionUrl = `${baseUrl}?${querystring.toString().toLowerCase()}`;
    return this.http.get<QuizResponse>(encodeURI(quizQuestionUrl));
  }
}
