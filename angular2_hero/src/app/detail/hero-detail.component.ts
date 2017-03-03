/**
 * Created by yan on 16-12-13.
 */

import {
    Component, OnInit, HostBinding, trigger, transition, animate, style, state
    }from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }  from '@angular/common';

import { Hero } from '../model/Hero';
import { HeroService } from '../hero.service';

import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./detail.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
          style({
            opacity: 1,
            transform: 'translateX(0)'
          })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%) rotateY(360deg)'
        }),
        animate('0.7s ease-in')
      ]),
      transition(':leave', [
        animate('0.7s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
  // inputs: ['hero']
})
export class HeroDetailComponent implements OnInit{
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  @HostBinding('style.display') get display(){
    return 'block';
  }
  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}
  ngOnInit(): void{
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void{
    let heroId = this.hero ? this.hero.id : null;
    // this.router.navigate(['../../heroes', { id: heroId, foo: 'foo'}], { relativeTo: this.route }); 
    // 相对路径
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo'}]);
    // this.location.back();
    // console.log('back');
  }
  save(): void{
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  //  两种声明方法,但不可同时使用
// @Input()
//   hero: Hero;
}


