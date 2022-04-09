import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizType } from 'src/app/quiz/models';

@Injectable({providedIn: 'root'})
export class HttpService {
    constructor(private http: HttpClient) { }

    public getQuizTypes() {
       return this.http.get<QuizType[]>('https://gist.githubusercontent.com/riteshwaghela/57e688bdc6b1422fc07faf3e365382e7/raw/6beef09ad5459678090ad2dd06bafe62c249896e/quiz-types.json');
    }
    
}