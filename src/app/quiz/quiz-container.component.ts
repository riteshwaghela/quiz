import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { QuizComponent } from './quiz.component';
import { QuizObject, QuizState } from './models';
import { quiz } from '../quiz'
import { VoiceService } from '../voice.service';

const initialQuizState = {
    currentQuizIndex : 0,
    quizUserAnswer : []
}

@Component({
    selector: 'app-quiz-container',
    templateUrl: 'quiz-container.component.html',
    styleUrls: ['quiz-container.component.scss']
})

export class QuizContainerComponent implements OnInit, AfterViewInit {
    public quizList: QuizObject[] = [];
    public currentQuizIndex = 0;
    @ViewChild('quizComponentContainer', { read: ViewContainerRef }) quizComponentContainer!: ViewContainerRef;
    isShowResult = false;
    quizState: QuizState = initialQuizState;
    componentRef!: ComponentRef<QuizComponent>;
    resultMessage: string = '';

    constructor(private resolver: ComponentFactoryResolver, private voiceService: VoiceService ) { }

    ngOnInit() {
        this.shuffleQuiz(quiz.quiz);
        this.quizList = quiz.quiz;
    }

    ngAfterViewInit() {
        setTimeout( ()=> {
            this.creatQuizComponent(this.currentQuizIndex);
        })
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
        this.componentRef.instance.quizHeading = quiz.heading;
        this.componentRef.instance.selectedAnswer = this.quizState?.quizUserAnswer[currentQuizIndex]?.userAnswer;
        this.componentRef.instance.quizCounter = `${currentQuizIndex + 1} / ${this.quizList.length}`;
    }

    updateQuizState() {
        this.quizState = {...this.quizState, currentQuizIndex : this.currentQuizIndex };
        if(!this.quizState.quizUserAnswer[this.currentQuizIndex]) {
            this.quizState.quizUserAnswer.push({
                quizObject: this.componentRef.instance.quizObject,
                userAnswer: this.componentRef.instance.selectedAnswer,
                isAnswerCorrect: this.componentRef.instance.selectedAnswer === this.componentRef.instance.quizObject.correctAnswer,
                isAnswerSkipped:  this.componentRef.instance.selectedAnswer === ''
            });
        } else {
            this.quizState.quizUserAnswer[this.currentQuizIndex].quizObject = this.componentRef.instance.quizObject;
            this.quizState.quizUserAnswer[this.currentQuizIndex].userAnswer = this.componentRef.instance.selectedAnswer;
            this.quizState.quizUserAnswer[this.currentQuizIndex].isAnswerCorrect = this.componentRef.instance.selectedAnswer === this.componentRef.instance.quizObject.correctAnswer;
            this.quizState.quizUserAnswer[this.currentQuizIndex].isAnswerSkipped =  this.componentRef.instance.selectedAnswer === ''
        }
    }

    showResult() {
        this.updateQuizState();
        this.isShowResult = true;
        let extraMessage = '';
        const correctAnswerCount = this.quizState.quizUserAnswer.filter((userAnswer) => {
            return userAnswer.isAnswerCorrect
        }).length;

        if(correctAnswerCount === this.quizList.length) {
            extraMessage = 'You are a genious.'
        }
        this.resultMessage =   `You scored ${correctAnswerCount} out of ${this.quizList.length}. ${extraMessage}`; 
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