import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http'
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


import { QuizComponent } from './quiz.component';
import { QuizContainerComponent } from './quiz-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { QuizTypeComponent } from './quiz.type.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [MatRadioModule, BrowserModule, MatButtonModule, ReactiveFormsModule,
         MatCardModule, HttpClientModule, MatInputModule, MatIconModule],
    exports: [QuizContainerComponent, QuizComponent, QuizTypeComponent],
    declarations: [QuizComponent, QuizContainerComponent, QuizTypeComponent ],
    providers: [],
})
export class QuizModule { }
