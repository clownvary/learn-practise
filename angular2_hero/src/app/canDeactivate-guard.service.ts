/**
 * Created by wangyan on 17/2/22.
 */
import { Injectable } from '@angular/core';
import { CanDeactivate , ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import  { Component } from '@angular/core';

@Injectable()
/**
 * CanDeactivate<T>必须有个泛型,
 */
export class CanDeactivateGuard implements CanDeactivate<Component> {
    canDeactivate(component: Component,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Promise<boolean> | boolean
    {
       // console.log(route.params['id']);
        console.log(state.url);
        return confirm('exit?'); // true | false
    }
}