/**
 * Created by wangyan on 16/12/26.
 */
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }
    // 子路由保护机制
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let url: string = state.url;
        return this.checkChild(url);
    }
    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) { return true; }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        let sessionId = 123456789;
        // 额外参数,loginComponent中需要开启对应的设置
        // let navigationExtra: NavigationExtras = {
        //     queryParams: {'session_id': sessionId},
        //     fragment: 'anchor'
        // };
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }
    checkChild(url: string): boolean
    {
     return this.checkLogin(url);
       // return true;
    }
}
