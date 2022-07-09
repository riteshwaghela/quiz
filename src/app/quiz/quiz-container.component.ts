import {
    AfterViewInit, Component, ComponentFactoryResolver,
    ComponentRef, Input, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

import { QuizComponent } from './quiz.component';
import { QuizObject, QuizState, QuizType } from './models';
import { VoiceService } from '../voice.service';
import { HttpClient } from '@angular/common/http';

const initialQuizState = {
    currentQuizIndex: 0,
    quizUserAnswer: []
}

@Component({
    selector: 'app-quiz-container',
    templateUrl: 'quiz-container.component.html',
    styleUrls: ['quiz-container.component.scss']
})

export class QuizContainerComponent implements OnInit {
    @Input('quizType') quizType!: QuizType;
    @ViewChild('quizComponentContainer', { read: ViewContainerRef }) quizComponentContainer!: ViewContainerRef;

    quizList: QuizObject[] = [];
    currentQuizIndex = 0;
    isShowResult = false;
    quizState: QuizState = initialQuizState;
    componentRef!: ComponentRef<QuizComponent>;
    resultMessage: string = '';

    constructor(private resolver: ComponentFactoryResolver, private voiceService: VoiceService, private http: HttpClient) { }

    ngOnInit() {
        this.http.get(this.quizType.quizPath).subscribe((quiz: any) => {
            // quiz = {
            //     "heading": "Asian - Counttry Flag Quiz",
            //     "quiz": [{
            //         "question": "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/800px-Flag_of_India.svg.png",
            //         "options": ["Iran", "India", "Iraq", "Egypt"],
            //         "correctAnswer": "India"
            //     }, {
            //         "question": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/1200px-Flag_of_Pakistan.svg.png",
            //         "options": ["Turkey", "Pakistan", "Afganistan", "Tajikistan"],
            //         "correctAnswer": "Pakistan"
            //     }]
            // };
            this.shuffleQuiz(quiz.quiz);
            this.quizList = quiz.quiz;
            this.creatQuizComponent(this.currentQuizIndex);
        });
    }

    handlePrevious() {
        this.updateQuizState();
        this.currentQuizIndex--;
        this.creatQuizComponent(this.currentQuizIndex);
    }

    handleNext() {
        this.updateQuizState();
        this.currentQuizIndex++;
        this.creatQuizComponent(this.currentQuizIndex);
    }

    creatQuizComponent(currentQuizIndex: number) {
        this.quizComponentContainer.clear();
        const factory = this.resolver.resolveComponentFactory(QuizComponent);
        this.componentRef = this.quizComponentContainer.createComponent(factory);
        this.componentRef.instance.quizObject = this.quizList[currentQuizIndex];
        this.componentRef.instance.quizHeading = this.quizType.type;
        this.componentRef.instance.selectedAnswer = this.quizState?.quizUserAnswer[currentQuizIndex]?.userAnswer;
        this.componentRef.instance.quizCounter = `${currentQuizIndex + 1} / ${this.quizList.length}`;
    }

    updateQuizState() {
        this.quizState = { ...this.quizState, currentQuizIndex: this.currentQuizIndex };
        if (!this.quizState.quizUserAnswer[this.currentQuizIndex]) {
            this.quizState.quizUserAnswer.push({
                quizObject: this.componentRef.instance.quizObject,
                userAnswer: this.componentRef.instance.selectedAnswer,
                isAnswerCorrect: this.componentRef.instance.selectedAnswer === this.componentRef.instance.quizObject.correctAnswer,
                isAnswerSkipped: this.componentRef.instance.selectedAnswer === ''
            });
        } else {
            this.quizState.quizUserAnswer[this.currentQuizIndex].quizObject = this.componentRef.instance.quizObject;
            this.quizState.quizUserAnswer[this.currentQuizIndex].userAnswer = this.componentRef.instance.selectedAnswer;
            this.quizState.quizUserAnswer[this.currentQuizIndex].isAnswerCorrect = this.componentRef.instance.selectedAnswer === this.componentRef.instance.quizObject.correctAnswer;
            this.quizState.quizUserAnswer[this.currentQuizIndex].isAnswerSkipped = this.componentRef.instance.selectedAnswer === ''
        }
    }

    showResult() {
        this.updateQuizState();
        this.isShowResult = true;
        let extraMessage = '';
        const correctAnswerCount = this.quizState.quizUserAnswer.filter((userAnswer) => {
            return userAnswer.isAnswerCorrect
        }).length;

        if (correctAnswerCount === this.quizList.length) {
            extraMessage = 'You are a genious.'
        }
        this.resultMessage = `You scored ${correctAnswerCount} out of ${this.quizList.length}. ${extraMessage}`;
        this.voiceService.cancel();
        this.voiceService.speak(this.resultMessage);
    }

    private shuffleQuiz(quizList: QuizObject[]) {
        for (let i = quizList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [quizList[i], quizList[j]] = [quizList[j], quizList[i]];
        }
    }
}