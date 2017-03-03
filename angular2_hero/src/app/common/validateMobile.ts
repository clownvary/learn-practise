/**
 * Created by wangyan on 17/3/4.
 */
import { FormControl } from '@angular/forms';

/**
 * 自定义验证带参数,注意参数的写法
 * @param param 自定义的参数
 * @returns {function(FormControl): {validateMobile: {valid: boolean}}}
 */
export function validateMobile(param: any)
{
    // return的格式必须是FormCnntrol类型的
    return (c: FormControl) => {
        let MOBILE_REGEXP = /^1[0-9]{10,10}$/;
        console.log(param);
        return MOBILE_REGEXP.test(c.value) ? null : {
            validateMobile: {valid: false}
        }
        // 返回值要么是null,要么是一个对象 { key: {valid :false}},key是你自定义的验证器名称
    }

}