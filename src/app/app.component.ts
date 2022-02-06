import { Component } from '@angular/core';
import { QuizType } from './quiz/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz';

  selectedQuizType!: QuizType;

  onQuizSelection(quizType: QuizType) {
      this.selectedQuizType = quizType;
  }
}
