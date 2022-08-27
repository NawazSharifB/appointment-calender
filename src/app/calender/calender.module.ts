import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppointmentConfigModule } from '../appointment-config/appointment-config.module';
import { SharedModule } from '../shared/shared.module';
import { CalenderRoutingModule } from './calender-routing.module';
import { CalenderComponent } from './calender.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { CalenderBodyComponent } from './components/calender-body/calender-body.component';

const MATERIAL_MODULES = [MatCardModule, MatButtonModule];
@NgModule({
  declarations: [
    CalenderBodyComponent,
    AppointmentListComponent,
    AppointmentDetailsComponent,
    CalenderComponent
  ],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    SharedModule,
    MATERIAL_MODULES,
    AppointmentConfigModule,
  ],
  exports: [CalenderBodyComponent],
})
export class CalenderModule {}
