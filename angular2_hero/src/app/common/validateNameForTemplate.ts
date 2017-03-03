/**
 * Created by wangyan on 17/3/4.
 */
import { FormControl , AbstractControl, NG_VALIDATORS, Validator, Validators, ValidatorFn} from '@angular/forms';
import { Directive, OnChanges, Input, SimpleChanges} from '@angular/core';

/**
 * 自定义验证带参数,注意参数的写法
 * @param param 自定义的参数
 * @returns {function(FormControl): {validateMobile: {valid: boolean}}}
 */
@Directive({
    selector: '[validateNameX][ngModel]', //注意这里的意思是,类似css选择器,作用于那些同时具有validateName和ngModel属性的元素
    // 对应的模板上写的肯定是validateNameX 注意区分
    providers: [
        // 带参数即模板中形式不为validateNamex='xxx'的话,使用这种方式
        {
            provide: NG_VALIDATORS, useExisting: ValidatorNameDirective, multi: true
        }
        // 不带参数即模板中形式不为validateNamex='xxx'的话,使用下面的形式,当然这时的validateName验证函数也不应该有参数param
        // {
        //     provide: NG_VALIDATORS, useExisting: validateName , multi: true
        // }
    ]
})
// 注意这里的ValidatorNameDirective ,validateNameX,validateName,含义各不同
export class ValidatorNameDirective implements Validator, OnChanges{
    @Input() validateNameX: any; // 只有这样才能validateNameX='xxx'
    private valFn = Validators.nullValidator;
    ngOnChanges(changes: SimpleChanges): void{
     const change = changes['validateNameX'];
        if (change)
        {
             const val = change.currentValue;
             this.valFn = validateName(val);
        }
    }
    // 必须实现该方法
    validate(control: AbstractControl): any{
        return this.valFn(control);
    }

}

 function validateName(param: string): ValidatorFn
{

    // return的格式必须是FormControl类型的
    return (c: FormControl) => {
        console.log(param);
        return (<string>c.value).indexOf(param) !== -1 ? null : {
            validateName: {valid: false}
        }
        // 返回值要么是null,要么是一个对象 { key: {valid :false}},key是你自定义的验证器名称
    }
}
