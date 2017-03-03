/**
 * Created by wangyan on 17/2/21.
 */
import { Pipe, PipeTransform } from '@angular/core';
/**
 * 自定义管道,必须实现 PipeTrasnform 中的transform
 */
@Pipe({
    name: 'exponentialStrength'
})
export class ExponentialStrengthPipe implements PipeTransform {
transform(value: number, exponent: string): number
{
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
}
}
