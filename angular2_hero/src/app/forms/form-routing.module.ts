/**
 * Created by wangyan on 17/3/2.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { HeroFormComponent } from './hero-form.component';

const reactformRoutes: Routes = [
    {
        path: 'form',
        component: HeroFormComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(reactformRoutes)],
    exports: [RouterModule]
})
export class FormRouteModule{}