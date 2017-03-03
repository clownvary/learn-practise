/**
 * Created by wangyan on 17/3/2.
 */
import { QuestionBase }from './question-base';
export class TextboxQuestion extends QuestionBase <string>
{

    controlType= 'textbox';
    type: string;
    constructor(options: {}={}){
        super(options);
        this.type= options['type'] || '';
    }
}