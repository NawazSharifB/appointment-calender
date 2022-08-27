import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CalenderComponent } from './calender.component';
import { RouteParam } from '../enums/route-param';

@NgModule({
  imports: [RouterModule.forChild([
    { path: `:${RouteParam.NumberOfTheMonth}`, component: CalenderComponent, pathMatch: 'full'},
  ])],
  exports: [RouterModule],
})
export class CalenderRoutingModule {}
