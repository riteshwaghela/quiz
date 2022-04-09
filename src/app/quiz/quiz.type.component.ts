import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
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
    searchTerm = new FormControl('');


    ngOnInit() {
        this.quizTypes$ = this.http.getQuizTypes();
        this.searchTerm.valueChanges.pipe(debounceTime(500), switchMap((searchTerm)=> {
            return of(searchTerm);
        })).subscribe((searchTerm) => {
            this.quizTypes$ =  this.http.getQuizTypes().pipe(map((category) => { 
                return category.filter(cat => cat.description.includes(searchTerm.trim()))
             }));
        });
    }

    launchSelectedQuiz(quizType: QuizType) {
        this.quizTypeSelectedEvent.emit(quizType)
    }
}