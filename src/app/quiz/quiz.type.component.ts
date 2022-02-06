import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { quizTypes } from '../quiz-type';
import { QuizType } from './models';

@Component({
    selector: 'app-quiz-type',
    templateUrl: 'quiz.type.component.html',
    styleUrls: ['quiz.type.component.scss']
})

export class QuizTypeComponent implements OnInit {
    constructor() { }

    @Output() quizTypeSelectedEvent = new EventEmitter<QuizType>();

    quizTypes!: QuizType[];

    ngOnInit() {
        this.quizTypes = quizTypes;
    }

    launchSelectedQuiz(quizType: QuizType) {
        this.quizTypeSelectedEvent.emit(quizType)
    }
}