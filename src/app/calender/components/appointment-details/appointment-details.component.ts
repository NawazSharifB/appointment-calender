import { AppointmentData } from '../../../shared/interfaces/appointment-data';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent{
  constructor(
    @Inject(MAT_DIALOG_DATA) public appointmentData: AppointmentData,
    private matDialogRef: MatDialogRef<AppointmentDetailsComponent>
  ) {
    console.log(appointmentData);
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }

}
