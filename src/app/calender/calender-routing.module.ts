import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CalenderComponent } from './calender.component';
import { RouteParam } from '../enums/route-param';
import { getCurrentMonthString } from '../utils/date-utilities';

@NgModule({
  imports: [RouterModule.forChild([
    { path: `:${RouteParam.NumberOfTheMonth}`, component: CalenderComponent, pathMatch: 'full'},
    { path: ``, redirectTo: getCurrentMonthString(), pathMatch: 'full'},
  ])],
  exports: [RouterModule],
})
export class CalenderRoutingModule {}
