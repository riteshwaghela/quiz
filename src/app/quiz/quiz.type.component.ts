import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/services/http.service';
import { QuizType } from './models';

@Component({
    selector: 'app-quiz-type',
    templateUrl: 'quiz.type.component.html',
    styleUrls: ['quiz.type.component.scss']
})

export class QuizTypeComponent implements OnInit {
    constructor(private http: HttpService) { }

    @Output() quizTypeSelectedEvent = new EventEmitter<QuizType>();

    quizTypes$!: Observable<QuizType[]>;

    ngOnInit() {
        this.quizTypes$ = this.http.getQuizTypes();
    }

    launchSelectedQuiz(quizType: QuizType) {
        this.quizTypeSelectedEvent.emit(quizType)
    }
}