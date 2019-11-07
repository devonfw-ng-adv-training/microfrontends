import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-hero-row',
  templateUrl: './hero-row.component.html',
  styleUrls: ['./hero-row.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HeroRowComponent implements OnInit {

  @Input()
  heroId: number;

  @Input()
  name: string;

  @Output()
  onSelect = new EventEmitter<number>();

  @Output()
  onDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  select() {
    this.onSelect.emit(this.heroId);
  }

  delete() {
    this.onDelete.emit(this.heroId);
  }

}
