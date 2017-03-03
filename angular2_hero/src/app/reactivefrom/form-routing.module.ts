/**
 * Created by wangyan on 17/3/2.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { SimpleFormsComponent } from './simple-reactive-form/simple-form.component';
const reactformRoutes: Routes = [
    {
        path: 'reactform',
        component: AppComponent,
        children: [
            {
                path: 'simpleform',
                component: SimpleFormsComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(reactformRoutes)],
    exports: [RouterModule]
})
export class ReactiveFromRouteModule{}