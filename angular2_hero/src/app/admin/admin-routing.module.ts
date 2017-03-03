/**
 * Created by wangyan on 16/12/26.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageCrisesComponent } from './manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { CanDeactivateGuard } from '../canDeactivate-guard.service';
import { AuthGuard } from '../auth-guard.service';
import { RouteResolve } from '../resolve.service';
const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        // canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard], // 离开admin路径时回提示是否确认离开
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
               // canDeactivate: [CanDeactivateGuard],
                children: [
                    { path: 'crises',
                        component: ManageCrisesComponent ,
                        // 和angular1的resoleve类似,不同的是访问方式不同
                        resolve: {
                            demoResolve: RouteResolve //访问该数据看 crisesComponent
                        }
                    },
                    { path: 'heroes', component: ManageHeroesComponent },
                    { path: '', component: AdminDashboardComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [CanDeactivateGuard, RouteResolve]
})
export class AdminRoutingModule {}
