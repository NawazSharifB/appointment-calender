import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from './enums/route-paths';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { getCurrentMonthString } from './utils/date-utilities';

const routes: Routes = [
  { path: RoutePaths.Month, loadChildren: () => import('../app/calender/calender.module').then(m => m.CalenderModule) },
  { path: RoutePaths.NotFound, component: NotFoundComponent },
  { path: RoutePaths.RootRoute, redirectTo: `/${RoutePaths.Month}/${getCurrentMonthString()}`, pathMatch: 'full' },
  { path: RoutePaths.WildCard, component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
