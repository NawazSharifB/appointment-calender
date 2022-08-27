import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CalenderComponent } from './calender.component';
import { RouteParam } from '../enums/route-param';

const NUMBER_OF_JANUARY_MONTH = '1';

@NgModule({
  imports: [RouterModule.forChild([
    { path: `:${RouteParam.NumberOfTheMonth}`, component: CalenderComponent, pathMatch: 'full'},
    { path: ``, redirectTo: NUMBER_OF_JANUARY_MONTH, pathMatch: 'full'},
  ])],
  exports: [RouterModule],
})
export class CalenderRoutingModule {}
