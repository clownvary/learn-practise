/**
 * Created by wangyan on 17/3/2.
 */
import { Injectable } from '@angular/core';
import { QuestionBase } from './formclass/question-base';
import { DropdownQuestion } from  './formclass/question-dropdown';
import { TextboxQuestion } from './formclass/question-textbox';

@Injectable()
export class QuestionService{
    // Todo: get from a remote source of question metadata
    getQuestions()
    {
        let questions: QuestionBase<any>[] = [
        new  DropdownQuestion({
            key: 'brave',
            label: 'Bravery Rating',
            options: [
                {key: 'solid',  value: 'Solid'},
                {key: 'great',  value: 'Great'},
                {key: 'good',   value: 'Good'},
                {key: 'unproven', value: 'Unproven'}
            ],
            order: 3
        }),
            new TextboxQuestion({
                key: 'firstName',
                label: 'First name',
                value: 'Bombasto',
                required: true,
                order: 1
            }),
            new TextboxQuestion({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                order: 2
            }),
            new TextboxQuestion({
                    key: 'firstNameX',
                    label: 'First nameX',
                    value: 'BombastoX',
                    required: true,
                    order: 4
                })
            ];
        return questions.sort((a, b) => a.order - b.order);

    }
}
