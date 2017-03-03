/**
 * Created by wangyan on 17/2/20.
 */
import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HeroesComponent } from '../heroes/heroes.component';
import { HighlightDirective } from './highlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
/**
 * 公共复用组件
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        HeroesComponent,
        HighlightDirective,
        ExponentialStrengthPipe
    ],
    exports: [
        HeroesComponent,
        HighlightDirective,
        ExponentialStrengthPipe
    ]
})
export class ShareModule { }
