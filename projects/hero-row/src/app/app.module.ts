import {ApplicationRef, DoBootstrap, ErrorHandler, Injector, NgModule, NgZone} from '@angular/core';
import { HeroRowComponent } from './hero-row.component';
import {createCustomElement} from '@angular/elements';
import {BrowserModule} from '@angular/platform-browser';
import {RowErrorHandler} from './row-error-handler';

@NgModule({
  declarations: [HeroRowComponent],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: RowErrorHandler}
  ],
  exports: [HeroRowComponent],
  entryComponents: [HeroRowComponent]
})
export class AppModule implements DoBootstrap {
  constructor(ngZone: NgZone, private injector: Injector) {
    console.log('HeroRowModule Constructor');
    console.log('HeroRowModule Module, ngZone', ngZone);
    if (!(window as any).ngZone) {
      (window as any).ngZone = ngZone;
    }
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    console.log('HeroRowModule ngDoBootstrap');
    const heroRowElement = createCustomElement(HeroRowComponent, { injector: this.injector });
    customElements.define('hero-row', heroRowElement);
  }
}
