/**
 * Created by wangyan on 16/12/26.
 */

import { Component } from '@angular/core';
@Component({
    template:  `
    <p>Manage your heroes here</p>
    <p>自定义管道</p>
    <div>Normal power: <input type="text" [(ngModel)]="power"></div>
    <div>Boost factor: <input  type="text" [(ngModel)]="factor"></div>

    <p>super hero power boost:{{power | exponentialStrength : factor }}</p>
  `
})
export class ManageHeroesComponent {
    power = 5;
    factor = 1;
}
