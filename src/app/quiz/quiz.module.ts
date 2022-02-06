import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';


import { QuizComponent } from './quiz.component';
import { QuizContainerComponent } from './quiz-container.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [MatRadioModule, BrowserModule, MatButtonModule],
    exports: [QuizContainerComponent, QuizComponent],
    declarations: [QuizComponent, QuizContainerComponent ],
    providers: [],
})
export class QuizModule { }
