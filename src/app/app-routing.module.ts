import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from './enums/route-paths';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const NUMBER_OF_JANUARY_MONTH = '1';

const routes: Routes = [
  { path: RoutePaths.Month, loadChildren: () => import('../app/calender/calender.module').then(m => m.CalenderModule) },
  { path: RoutePaths.NotFound, component: NotFoundComponent },
  { path: RoutePaths.RootRoute, redirectTo: `/${RoutePaths.Month}/${NUMBER_OF_JANUARY_MONTH}`, pathMatch: 'full' },
  { path: RoutePaths.WildCard, component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
