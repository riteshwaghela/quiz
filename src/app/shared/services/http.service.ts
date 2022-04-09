import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { QuizType } from 'src/app/quiz/models';

@Injectable({providedIn: 'root'})
export class HttpService {
    constructor(private http: HttpClient) { }

    public getQuizTypes() {
       return this.http.get<QuizType[]>('https://gist.githubusercontent.com/riteshwaghela/57e688bdc6b1422fc07faf3e365382e7/raw/51d65e14c44c17763de6cc318eadf2649ddc664d/quiz-types.json').pipe(shareReplay(1));
    }
    
}