/**
 * Created by wangyan on 17/2/22.
 */

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,  } from '@angular/router';

@Injectable()
export class RouteResolve implements Resolve<any>{

    resolve(route: ActivatedRouteSnapshot): Promise<any>|Promise<any>|any {
        console.log('i am from resolve,exec before route in');
        return 'kkkkk'; // 可以返回任何值,作为resolve的时候
    }

}
