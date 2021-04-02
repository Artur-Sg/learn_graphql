import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@common/layout/layout.module';
import { SearchPageComponent } from './components/search-page/search-page.component';

@NgModule({
  declarations: [SearchPageComponent],
  providers: [],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
  ],
})
export class SearchModule { }
