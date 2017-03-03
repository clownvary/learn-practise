/**
 * Created by wangyan on 16/12/26.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
    template:  `
    <p>Manage your crises here</p>
    <!--<my-heroes></my-heroes>-->
  `
})
export class ManageCrisesComponent implements OnInit{
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}
     ngOnInit() {
         // 获取resolve的data方式
         this.route.data
             .subscribe((data: {demoResolve: any}) => {
                 console.log(`from resolve data ${data.demoResolve}`);
             });
    }
}
