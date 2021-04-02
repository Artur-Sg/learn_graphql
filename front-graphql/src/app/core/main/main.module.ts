import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@common/layout/layout.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LinkPageComponent } from './components/link-page/link-page.component';

@NgModule({
  declarations: [MainPageComponent, LinkPageComponent],
  providers: [],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
  ],
})
export class MainModule { }
