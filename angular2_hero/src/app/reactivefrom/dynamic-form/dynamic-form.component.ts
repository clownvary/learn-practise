/**
 * Created by wangyan on 17/3/2.
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../formclass/question-base';
import { QuestionControlService } from '../question-control.service';
@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit{
    @Input() questions: QuestionBase<any>[]= [];
    form: FormGroup;
    payload = '';
     ngOnInit(): void {
        this.form = this.qcs.toFormGroup(this.questions); //通过questions得到form,每个控件都得绑定,不然识别不了是哪个form的
    }
    constructor(private  qcs: QuestionControlService){}
    onSubmit()
    {
        this.payload = JSON.stringify(this.form.value);
    }
}