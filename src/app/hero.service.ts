import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {map, tap} from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroes: Hero[] = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

  constructor(
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    this.log('fetched heroes');
    return of([...this.heroes]);
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const hero = this.heroes.find( (h: Hero) => h.id === id);
    const outcome = hero ? `fetched` : `did not find`;
    this.log(`${outcome} hero id=${id}`);
    return of(hero);
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return of([...this.heroes]).pipe(
      map( (heroes: Hero[]) => heroes.filter( (hero) => hero.name.indexOf(term) >= 0)),
      tap((heroes: Hero[]) => this.log(`found ${heroes.length} heroes matching "${term}"`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    let maxId = 0;
    if (this.heroes.length>0) {
      maxId = Math.max(...this.heroes.map( (h) => h.id));
    }
    hero.id = maxId + 1;
    this.heroes = [...this.heroes, hero];
    this.log(`added hero ${hero.id}`);
    return of(hero);
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const index = this.heroes.findIndex( (h: Hero) => h.id === id);
    if (index >= 0) {
      const deletedHero = this.heroes[index];
      this.heroes.splice(index, 1);
      this.log(`deleted hero ${id}`);
      return of(deletedHero);
    } else {
      this.log(`delete hero ${id} not found`);
      return of(undefined);
    }
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    const index = this.heroes.findIndex( (h: Hero) => h.id === hero.id);
    if (index >= 0) {
      this.heroes[index] = hero;
      this.log(`update hero ${hero.id}`);
      return of(hero);
    } else {
      this.log(`update hero ${hero.id} unknown`);
      return of(undefined);
    }
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`HeroService: ${message}`);
    this.messageService.add(`HeroService: ${message}`);
  }
}
