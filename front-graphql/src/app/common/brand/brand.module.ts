import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandLogoComponent } from './components/brand-logo/brand-logo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BrandLogoComponent],
  exports: [
    BrandLogoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class BrandModule { }
