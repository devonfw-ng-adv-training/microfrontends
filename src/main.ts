import {enableProdMode, NgZone} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('Main bootstrap: ngZone', (window as any).ngZone);

platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: (window as any).ngZone });
