// Angular Core
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { TriviaApiService } from 'src/app/services/trivia-api.service';
import { QuizDataService } from 'src/app/services/quiz-data.service';

//Constatns
import {
  QueryParamData,
  QuizQuestion,
  QuizResponse,
  SelectedOptionsDTO,
  Trivia,
  TriviaDTO,
} from '../constants/trivia.constant';

// Rxjs
import { Subscription } from 'rxjs/internal/Subscription';

// Enums
import { DataLimit, DataType, DifficultyLevel } from '../enums/trivia.enum';

@Component({
  selector: 'app-trivia-form',
  templateUrl: './trivia-form.component.html',
  styleUrls: ['./trivia-form.component.scss'],
})
export class TriviaFormComponent implements OnInit {
  protected categories: TriviaDTO[] = [];
  protected difficultyLevels = Object.values(DifficultyLevel);
  protected selectedCategory!: number;
  protected selectedDifficulty!: string;

  public selectedOptions: SelectedOptionsDTO = {};
  public quizQuestion: QuizQuestion[] = [];

  private categoriesSubscription!: Subscription;
  private quizQuestionSubscription!: Subscription;
  private responseCode!: number;
  public disableCreateButton: boolean = false;

  constructor(
    private router: Router,
    private triviaApiService: TriviaApiService,
    private quizDataService: QuizDataService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  // Get the List of Categories
  getCategories() {
    this.categoriesSubscription = this.triviaApiService
      .getCategories()
      .subscribe((data: Trivia) => {
        this.categories = data.trivia_categories;
      });
  }

  // Quesry parameter formation
  encodeQueryData(queryParamData: QueryParamData): string {
    const ret = [];
    for (let param in queryParamData)
      ret.push(
        encodeURIComponent(param) +
          '=' +
          encodeURIComponent(queryParamData[param])
      );
    return ret.join('&');
  }

  // Handle the creation of trivia based on selectedCategory and selectedDifficulty
  createTrivia() {
    this.disableCreateButton = true;
    const queryParamData: QueryParamData = {
      amount: DataLimit.FIVE,
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
      type: DataType.MULTIPLE,
    };
    const querystring = this.encodeQueryData(queryParamData);

    // get quiz data
    this.quizQuestionSubscription = this.triviaApiService
      .getQuizQuestions(querystring)
      .subscribe((data: QuizResponse): void => {
        this.quizQuestion = data.results;
        this.responseCode = data.response_code;
        this.displayOptionsRandomOrder(this.quizQuestion);
      });
  }

  // Reset selected options and enable Create button when category is changed
  onCategoryChange() {
    this.resetSelectedOptions();
    this.disableCreateButton = false;
  }
  
  // Reset selected options and enable Create button when difficulty is changed
  onDifficultyChange() {
    this.resetSelectedOptions();
    this.disableCreateButton = false;
  }

  // Reset the selectedOptions object
  resetSelectedOptions() {
    this.selectedOptions = {};
  }

  // select the options
  selectOption(questionIndex: string, optionIndex: number) {
    this.selectedOptions[questionIndex] = optionIndex;
  }

  // display options in random order
  displayOptionsRandomOrder(quizQuestion: QuizQuestion[]) {
    quizQuestion.forEach((question) => {
      question.displayOptions = [
        question.correct_answer,
        ...question.incorrect_answers,
      ];

      //shuffle the choices randomly
      question.displayOptions.sort(() => Math.random() - 0.5);
    });
  }

  // Check if all the questions are answered
  allQuestionsAnswered(): boolean {
    for (let i = 0; i < this.quizQuestion.length; i++) {
      if (!this.selectedOptions.hasOwnProperty(i.toString())) {
        return false;
      }
    }
    return true;
  }

  // Navigate to the desired component after quiz submission
  submitQuiz() {
    this.gatherQuizData(this.quizQuestion, this.selectedOptions);
    this.router.navigate(['/result']);
  }

  // Gather Quiz data
  gatherQuizData(
    displayOptions: QuizQuestion[],
    selectedOptions: SelectedOptionsDTO
  ) {
    const quizData: QuizResponse = {
      results: displayOptions,
      selectedOptions: selectedOptions,
      response_code: this.responseCode,
    };
    if (quizData !== undefined) {
      this.quizDataService.setQuizData(quizData);
    }
  }

  ngOnDestroy() {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.quizQuestionSubscription) {
      this.quizQuestionSubscription.unsubscribe();
    }
  }
}
