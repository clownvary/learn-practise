"use strict";
/**
 * Created by yan on 16-12-14.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_service_1 = require('../hero.service');
/*
 * App Component
 * Top Level Component
 */
var HeroesComponent = (function () {
    function HeroesComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
    }
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
    };
    ;
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    ;
    HeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedHero.id]);
    };
    HeroesComponent = __decorate([
        core_1.Component({
            selector: 'my-heroes',
            encapsulation: core_1.ViewEncapsulation.None,
            // providers: [HeroService],//已经全局导入
            styleUrls: [
                './heroes.component.css'
            ],
            templateUrl: './heroes.component.html'
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.Router])
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map