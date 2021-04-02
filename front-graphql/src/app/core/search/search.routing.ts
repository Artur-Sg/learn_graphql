import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchModule } from './search.module';
import { SearchPageComponent } from './components/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
];

@NgModule({
  imports: [SearchModule, RouterModule.forChild(routes)],
})
export class SearchRoutingModule {}
