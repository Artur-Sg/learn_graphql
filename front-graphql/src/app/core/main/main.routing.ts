import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LinkPageComponent } from './components/link-page/link-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: ':id',
    component: LinkPageComponent,
  },
];

@NgModule({
  imports: [MainModule, RouterModule.forChild(routes)],
})
export class MainRoutingModule {}
