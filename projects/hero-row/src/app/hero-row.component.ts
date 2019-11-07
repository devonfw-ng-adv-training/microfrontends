import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {HeroService} from '../../../../src/app/hero.service';
import {Hero} from '../../../../src/app/hero';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-hero-row',
  templateUrl: './hero-row.component.html',
  styleUrls: ['./hero-row.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HeroRowComponent implements OnInit {

  _heroId$ = new BehaviorSubject<number>(undefined);

  hero$: Observable<Hero> = this._heroId$.pipe(
    tap( (id) => console.log('will load hero for id ', id)),
    switchMap((id) => this.heroService.getHero(id)),
    tap( (hero) => console.log( 'loaded hero: ', JSON.stringify(hero)))
  );

  @Output()
  onSelect = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<number>();

  constructor(private heroService: HeroService) {}

  ngOnInit() {
  }

  @Input()
  set heroId(id: number) {
    console.log('set id value ', id, ' type', typeof id);
    this._heroId$.next(+id);
  }

  select() {
    this.onSelect.emit(this._heroId$.getValue());
  }

  delete() {
    this.heroService.deleteHero(this._heroId$.getValue());
    this.onDelete.emit(this._heroId$.getValue());
  }

}
