import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {HeroRowComponent} from './heroes/hero-row/hero-row.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [HeroRowComponent]
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor( private injector: Injector) {
    const heroRowElement = createCustomElement(HeroRowComponent, { injector });
    customElements.define('hero-row', heroRowElement);
  }
}
