import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from './enums/route-paths';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: RoutePaths.Month, loadChildren: () => import('../app/calender/calender.module').then(m => m.CalenderModule) },
  { path: RoutePaths.RootRoute, redirectTo: `/${RoutePaths.Month}/1`, pathMatch: 'full' },
  { path: RoutePaths.WildCard, component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
