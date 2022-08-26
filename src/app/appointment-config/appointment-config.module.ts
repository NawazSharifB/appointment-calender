import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { AppointmentConfigComponent } from './components/appointment-config/appointment-config.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';

const MATERIAL_MODULES = [MatDialogModule, MatCardModule, MatButtonModule];

@NgModule({
  declarations: [AppointmentConfigComponent, CreateAppointmentComponent],
  imports: [CommonModule, MATERIAL_MODULES, SharedModule],
  exports: [AppointmentConfigComponent],
})
export class AppointmentConfigModule {}
