import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { AppointmentConfigComponent } from './components/appointment-config/appointment-config.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { NumericInputDirective } from './directives/numeric-input.directive';

const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
];

const EXPORTED_DECLARATIONS = [AppointmentConfigComponent];

@NgModule({
  declarations: [CreateAppointmentComponent, NumericInputDirective, EXPORTED_DECLARATIONS],
  imports: [CommonModule, SharedModule, MATERIAL_MODULES],
  exports: [EXPORTED_DECLARATIONS],
})
export class AppointmentConfigModule {}
