import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import { HeroRowComponent } from './hero-row.component';
import {createCustomElement} from '@angular/elements';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [HeroRowComponent],
  imports: [
    BrowserModule
  ],
  exports: [HeroRowComponent],
  entryComponents: [HeroRowComponent]
})
export class AppModule implements DoBootstrap {
  constructor( private injector: Injector) {
    console.log('HeroRowModule Constructor');
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    console.log('HeroRowModule ngDoBootstrap');
    const heroRowElement = createCustomElement(HeroRowComponent, { injector: this.injector });
    customElements.define('hero-row', heroRowElement);
  }
}
