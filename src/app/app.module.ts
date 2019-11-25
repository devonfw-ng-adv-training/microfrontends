import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NgZone} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';
import {MainErrorHandler} from './main-error-handler';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: MainErrorHandler }
  ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
  constructor(ngZone: NgZone) {
    console.log('Heroes Module, ngZone', ngZone);
    if (!(window as any).ngZone) {
      (window as any).ngZone = ngZone;
    }
    setTimeout( () => {}, 1000);
    //   <script src="assets/main-es2015.js"></script>
    const script: HTMLScriptElement = document.createElement('script');
    script.src = 'assets/main-es2015.js';
    document.head.appendChild(script);
    //   <script src="assets/polyfills-es2015.js"></script>
    const script2: HTMLScriptElement = document.createElement('script');
    script2.src = 'assets/polyfills-es2015.js';
    document.head.appendChild(script2);
  }
}
