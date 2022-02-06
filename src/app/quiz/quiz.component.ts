import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoiceService } from '../voice.service';

import { QuizObject } from './models';

@Component({
    selector: 'app-quiz',
    templateUrl: 'quiz.component.html',
    styleUrls: ['quiz.component.scss'],
    providers: [VoiceService],
    animations: [
        trigger('detailExpand', [
            state('false', style({ 'height': '0px', 'minHeight': '0', 'visibility': 'hidden' })),
            state('true', style({ 'height': '*', 'visibility': 'visible' })),
            transition('true <=> false', animate('1000ms')),
          ]),
      ]
})

export class QuizComponent implements OnInit {
    @Input('quizObject') quizObject!: QuizObject;
    @Input('quizHeading') quizHeading!: string;
    @Input('quizCounter') quizCounter!: string;

    @Output() answerEvent = new EventEmitter<string>();
    expand: any;

    selectedAnswer: string = '';
    
    constructor(private voiceService: VoiceService) { }

    ngOnInit() {
        this.expand = 'false'
        setTimeout(() => {
            this.expand = 'true'
            console.log(this.expand)
        }, 200)
        this.voiceService.cancel();
        this.voiceService.speak(this.quizObject.question)
        this.voiceService.speak('Your options are ');
        this.voiceService.speak(this.quizObject.options[0]);
        this.voiceService.speak(this.quizObject.options[1]);
        this.voiceService.speak(this.quizObject.options[2]);
        this.voiceService.speak(this.quizObject.options[3]);
    }

    onAnswer(answer: string) {
        this.selectedAnswer = answer;
        this.answerEvent.emit(this.selectedAnswer);
        this.voiceService.cancel();
        this.voiceService.speak('You selected '+answer)
    }
}