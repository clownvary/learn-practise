/**
 * Created by wangyan on 16/12/26.
 */
import { Component } from '@angular/core';
@Component({
    template:  `
<h4>Pick a highlight color自定义属性型指令</h4>
<div>
  <input type="radio" name="colors" (click)="color='lightgreen'">Green
  <input type="radio" name="colors" (click)="color='yellow'">Yellow
  <input type="radio" name="colors" (click)="color='cyan'">Cyan
</div>
    <p [myHighlight]="color" (onClickTest)="clickHandle($event)" [defaultColor]="'violet'">Dashboard{{color | uppercase}}</p>
    
  `
})
export class AdminDashboardComponent {
    clickHandle(strFomrChild: string, event)
    {
        console.log(`i am from parent ${strFomrChild}`);
    }

}
