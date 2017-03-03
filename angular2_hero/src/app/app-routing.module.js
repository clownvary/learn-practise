"use strict";
/**
 * Created by yan on 16-12-14.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_detail_component_1 = require('./detail/hero-detail.component');
var heroes_component_1 = require('./heroes/heroes.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var routes = [
    {
        path: 'heroes',
        component: heroes_component_1.HeroesComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: hero_detail_component_1.HeroDetailComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map