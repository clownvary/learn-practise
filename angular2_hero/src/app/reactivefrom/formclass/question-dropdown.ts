/**
 * Created by wangyan on 17/3/2.
 */
import { QuestionBase }from './question-base';
export class DropdownQuestion extends QuestionBase <string>
{

    controlType = 'dropdown';
    options: { key: string, value: string}[]= [];
    constructor(options: {} = {})
    {
        super(options);
        this.options = options['options'] || [];
    }

}