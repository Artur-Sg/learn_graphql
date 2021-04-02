import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('@core/main/main.routing').then((m) => m.MainRoutingModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@core/search/search.routing').then((m) => m.SearchRoutingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class RootRoutingModule {}
