/**
 * Created by wangyan on 17/3/2.
 */

import { Component } from '@angular/core';
import { QuestionService } from './question.service';
@Component({
    template:  `
    <h3>R-Form</h3>
    <p>Job Application for Heroes</p>
    <div>
    <dynamic-form [questions]="questions"></dynamic-form>
    </div>
  `,
    providers: [QuestionService]
})
export class AppComponent {
    questions: any[];
    constructor(service: QuestionService){
        this.questions = service.getQuestions();
    }
}
