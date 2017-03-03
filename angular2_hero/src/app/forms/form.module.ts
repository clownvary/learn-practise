/**
 * Created by wangyan on 17/3/2.
 */
import {  BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeroFormComponent }  from './hero-form.component';
import {  FormRouteModule } from './form-routing.module';

//自定义验证
import { ValidatorNameDirective } from '../common/validateNameForTemplate';

@NgModule({
    imports: [BrowserModule, FormsModule, FormRouteModule],
    declarations: [HeroFormComponent, ValidatorNameDirective]
})
export  class FormModule { }
