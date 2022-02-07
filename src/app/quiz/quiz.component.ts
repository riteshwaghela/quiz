import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoiceService } from '../voice.service';

import { QuizObject } from './models';

@Component({
    selector: 'app-quiz',
    templateUrl: 'quiz.component.html',
    styleUrls: ['quiz.component.scss'],
    animations: [
        trigger('fadeInGrow', [
            transition(':enter', [
                query(':enter', [
                    style({ opacity: 0 }),
                    stagger('50ms', [
                        animate('500ms', style({ opacity: 1 }))
                    ])
                ])
            ])
        ])
    ]
})

export class QuizComponent implements OnInit {
    @Input('quizObject') quizObject!: QuizObject;
    @Input('quizHeading') quizHeading!: string;
    @Input('quizCounter') quizCounter!: string;

    @Output() answerEvent = new EventEmitter<string>();

    expand: boolean = false;
    selectedAnswer: string = '';
    disableEnableButtonText = 'Disable Sound';

    constructor(private voiceService: VoiceService) { }

    ngOnInit() {
        setTimeout(() => {
            this.expand = true;
        });
        this.disableEnableButtonText =  this.voiceService.isSoundDisabled ? 'Enable Sound' : 'Disable Sound';
        this.voiceService.cancel();
        this.speakQuestionAnswer();
    }

    onAnswer(answer: string) {
        this.selectedAnswer = answer;
        this.answerEvent.emit(this.selectedAnswer);
        this.voiceService.cancel();
        this.voiceService.speak('You selected ' + answer)
    }

    toggleSound() {
        this.voiceService.cancel();
        this.voiceService.isSoundDisabled = !this.voiceService.isSoundDisabled;
        this.disableEnableButtonText = this.voiceService.isSoundDisabled ? 'Enable Sound' : 'Disable Sound';
        if(!this.voiceService.isSoundDisabled) {
            this.speakQuestionAnswer();
        }
    }

    private speakQuestionAnswer() {
        this.voiceService.speak(this.quizObject.question);
        this.voiceService.speak('Your options are ');
        this.voiceService.speak(this.quizObject.options[0]);
        this.voiceService.speak(this.quizObject.options[1]);
        this.voiceService.speak(this.quizObject.options[2]);
        this.voiceService.speak(this.quizObject.options[3]);
    }
}