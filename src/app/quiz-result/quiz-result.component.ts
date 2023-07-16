// Angular
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { QuizDataService } from 'src/app/services/quiz-data.service';

//Constants/DTOs
import { QuizQuestion, QuizResponse, SelectedOptionsDTO } from '../constants/trivia.constant';

// Enums
import { ColorCode } from '../enums/trivia.enum';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit, AfterViewInit {

  public quizQuestion: QuizQuestion[] = [];
  public selectedOptions: SelectedOptionsDTO  = {};
  public score: number = 0;

  private quizData: QuizResponse = {} as QuizResponse;

  constructor(
    private router: Router,
    private quizDataService: QuizDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.quizData = this.quizDataService.getQuizData();
    this.quizQuestion = this.quizData?.results;
    this.quizQuestion?.map((question) => question?.displayOptions);
  }

  // redirect back to new quiz creation
  createNewQuiz() {
    this.router.navigate(['/trivia-quiz']);
  }

  // display button color based on correct/incorrect options
  getButtonClass(questionIndex: number, optionIndex: number): string {
    this.selectedOptions = this.quizData?.selectedOptions;
    const selectedOption = this.selectedOptions[questionIndex.toString()];
    const correctAnswer = this.quizQuestion[questionIndex].correct_answer;
    if (this.quizQuestion[questionIndex].displayOptions[optionIndex] === correctAnswer) {
      return ColorCode.GREEN_CODE; // User submitted answer, green if correct
    } else if (optionIndex === selectedOption) {
      return ColorCode.RED_CODE; // User submitted answer, red color if incorrect
    } else {
      return ''; // Neither correct anser, nor user subitted answer.
    }
  }

  ngAfterViewInit() {
    this.calculateScore();
    this.cdRef.detectChanges();
  }

  //calculate the score and display
  calculateScore(): void {
    let score = 0;
    this.quizQuestion?.forEach((question, index) => {
      const selectedOption = this.selectedOptions[index.toString()];
      const correctAnswer = question.correct_answer;
      if (selectedOption !== undefined && question.displayOptions[selectedOption] === correctAnswer) {
        score++;
      }
    });
    this.score = score;
  }
  
  // display notification in color different colors according to scored marks
  getScoreColorClass(): string {
    if (this.score == 0 || this.score == 1) {
      return ColorCode.NOTIFY_RED;
    } else if (this.score == 2 || this.score == 3) {
      return ColorCode.NOTIFY_YELLOW;
    } else {
      return ColorCode.NOTIFY_GREEN;
    }
  }
  
}
