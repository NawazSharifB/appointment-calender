import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CalenderBodyComponent } from './components/calender-body/calender-body.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';

const MATERIAL_MODULES = [MatCardModule, MatButtonModule];
@NgModule({
  declarations: [CalenderBodyComponent, AppointmentListComponent, AppointmentDetailsComponent],
  imports: [CommonModule, SharedModule, MATERIAL_MODULES],
  exports: [CalenderBodyComponent],
})
export class CalenderModule {}
