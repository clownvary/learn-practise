/**
 * Created by yan on 16-12-14.
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Hero } from '../model/Hero';
import { HeroService } from '../hero.service';
/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'my-heroes',
  // encapsulation: ViewEncapsulation.None,
  // providers: [HeroService],//已经全局导入
  styleUrls: [
    './heroes.component.css'
  ],
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  private selectedId: number;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  };
  ngOnInit(): void {
    // can not work in this
    // this.route.params
    //   .switchMap((params: Params) => {
    //     this.selectedId = +params['id'];
    //     return this.heroService.getHeroes();
    //   });
    this.selectedId = 12;
    this.getHeroes();
  }
  isSelected(hero: Hero) {
    return hero.id === this.selectedId;
  }
  onSelect(hero: Hero): void{
    this.selectedHero = hero;
    this.gotoDetail();
  };
  gotoDetail(): void{
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: string): void{
    name = name.trim();
    if (!name){
      return;
    }
    this.heroService.create(name)
      .then(hero => {
      this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero );
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}
