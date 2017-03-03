/**
 * Created by wangyan on 16/12/26.
 */

import { NgModule }       from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';
import { ManageCrisesComponent }    from './manage-crises.component';
import { ManageHeroesComponent }    from './manage-heroes.component';
import { AdminRoutingModule }       from './admin-routing.module';

import { ShareModule } from '../common/share.module';
@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ShareModule,
        FormsModule
    ],
    declarations: [
        AdminComponent,
        AdminDashboardComponent,
        ManageCrisesComponent,
        ManageHeroesComponent
    ]
})
export class AdminModule {}
