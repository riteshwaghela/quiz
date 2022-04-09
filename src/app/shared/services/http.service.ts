import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizType } from 'src/app/quiz/models';

@Injectable({providedIn: 'root'})
export class HttpService {
    constructor(private http: HttpClient) { }

    public getQuizTypes() {
       return this.http.get<QuizType[]>('https://gist.githubusercontent.com/riteshwaghela/57e688bdc6b1422fc07faf3e365382e7/raw/cab1d61d37c75e21d51f2c320c1b67ad06a3abe7/quiz-types.json');
    }
    
}