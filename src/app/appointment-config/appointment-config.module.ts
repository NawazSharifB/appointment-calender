import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { AppointmentConfigComponent } from './components/appointment-config/appointment-config.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule, MAT_DATE_FORMATS} from '@angular/material/core';

const MATERIAL_MODULES = [
  MatDialogModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
];

@NgModule({
  declarations: [AppointmentConfigComponent, CreateAppointmentComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MATERIAL_MODULES, NgbModule],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
  exports: [AppointmentConfigComponent, CreateAppointmentComponent],
})
export class AppointmentConfigModule {}
