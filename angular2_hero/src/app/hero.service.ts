/**
 * Created by yan on 16-12-13.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './model/Hero';
@Injectable()
export class HeroService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesurl = 'app/heroes'; // 该url之所以这么定义是因为in-memory-data.service.ts 中导出的名称就是heroes,
  // 同时又因为是forRoot的相对根目录所以是app/heroes,app是应用名称
  constructor(private http: Http)
  {
  }
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesurl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  update(hero: Hero): Promise<Hero>
  {
    const url = `${this.heroesurl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.heroesurl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  getHeroes(): Promise<Hero[]>{
    return this.http.get(this.heroesurl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  };
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  };
  getHero(id: number): Promise<Hero>{
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
