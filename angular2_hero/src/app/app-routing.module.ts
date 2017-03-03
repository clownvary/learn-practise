/**
 * Created by yan on 16-12-14.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HeroDetailComponent } from './detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: 'heroes',
  //   component: HeroesComponent
  // },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
  // ,
  // {
  //   path: 'detail/:id',
  //   component: HeroDetailComponent
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)], //html5 路径格式
  // imports: [RouterModule.forRoot(routes, { useHash: true })],// #/xxx路径格式
   exports: [RouterModule]
})
export class AppRoutingModule { }
