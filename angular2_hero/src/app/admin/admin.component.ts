/**
 * Created by wangyan on 16/12/26.
 */
import { Component } from '@angular/core';
@Component({
    template:  `
    <h3>ADMIN</h3>
    <nav>
      <a routerLink="./" routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
      <a routerLink="./crises" routerLinkActive="active">Manage Crises</a>
      <a routerLink="./heroes"  routerLinkActive="active">Manage Heroes</a>
      
      
    </nav>
    <nav>
      <a [routerLink]="['./crises', { matrix: 'value' }]" routerLinkActive="active">route_style2</a>
      <a [routerLink]="['./crises']" [queryParams]="{ page: 1 }" routerLinkActive="active">route_query</a>
      <a [routerLink]="['./crises', 'xxx']" routerLinkActive="active">route_style2</a>
    </nav>
 <router-outlet >admin outlet</router-outlet>
  `
})
export class AdminComponent {
}
