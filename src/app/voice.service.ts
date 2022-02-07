import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: new () => any;
declare var webkitSpeechRecognitionEvent: any;

@Injectable({providedIn: 'root'})
export class VoiceService {
    public speechRecognition;
    public speechGrammarList: any;
    public speechRecognitionEvent;
    public recognition: any;
    public isSoundDisabled = false;

    public voiceConfig = {
        volume: 5,
        speed : 1,
        pitch: 5
    };

    constructor() { 
        this.speechRecognitionEvent =  webkitSpeechRecognitionEvent;
        this.speechRecognition = new webkitSpeechRecognition();

    }

    speak(text: string) {
        if(this.isSoundDisabled) {
          return;
        }
        let speech = new SpeechSynthesisUtterance();
        speech.lang = "en-US";
        speech.text = text;
        speech.volume = 6; //this.voiceConfig.volume;
        speech.rate = this.voiceConfig.speed;
        speech.pitch = 1; // this.voiceConfig.pitch;
    
        window.speechSynthesis.speak(speech);
        return speech;
      }

      cancel() {
        window.speechSynthesis.cancel();
      }
}