import { AppointmentData } from '../../../shared/interfaces/appointment-data';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent{
  @Input() appointmentData!: AppointmentData;

  // constructor(@Inject(MAT_DIALOG_DATA) public appointmentData: AppointmentData) {}

  closeDialog(): void {

  }

}
