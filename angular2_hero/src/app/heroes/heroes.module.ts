/**
 * Created by yan on 16-12-22.
 */
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../detail/hero-detail.component';
import { HeroService } from '../hero.service';

import { HeroRoutingModule } from './heroes-routing.module';
import { ShareModule } from '../common/share.module';


@NgModule({
  imports: [
    HeroRoutingModule,
      CommonModule,
      FormsModule,
      ShareModule
  ],
  declarations: [
    HeroDetailComponent
    // HeroesComponent //使用公共复用组件,shareModule来声明,尽量避免shareModule,很不好的体验
  ],
  providers: [
    HeroService
  ]
})
export class HeroesModule {}
