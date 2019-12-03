import { NgModule } from '@angular/core';
import { HeroRowComponent } from './hero-row.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [HeroRowComponent],
  imports: [
    RouterModule
  ],
  exports: [HeroRowComponent]
})
export class HeroRowModule { }
