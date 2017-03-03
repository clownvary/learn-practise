/**
 * Created by wangyan on 17/3/2.
 */
import {  BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }                 from './app.component';
import { SimpleFormsComponent } from './simple-reactive-form/simple-form.component';
import { DynamicFormComponent }         from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { ReactiveFromRouteModule } from './form-routing.module';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, ReactiveFromRouteModule],
    declarations: [AppComponent, SimpleFormsComponent, DynamicFormComponent, DynamicFormQuestionComponent]
})
export  class ReactFormModule { }
