import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http'

import { QuizComponent } from './quiz.component';
import { QuizContainerComponent } from './quiz-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { QuizTypeComponent } from './quiz.type.component';

@NgModule({
    imports: [MatRadioModule, BrowserModule, MatButtonModule, MatCardModule, HttpClientModule],
    exports: [QuizContainerComponent, QuizComponent, QuizTypeComponent],
    declarations: [QuizComponent, QuizContainerComponent, QuizTypeComponent ],
    providers: [],
})
export class QuizModule { }
