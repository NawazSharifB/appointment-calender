import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentData } from '../../../shared/interfaces/appointment-data';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent{
  constructor(
    @Inject(MAT_DIALOG_DATA) public appointmentData: AppointmentData,
    private matDialogRef: MatDialogRef<AppointmentDetailsComponent>
  ) {}

  closeDialog(): void {
    this.matDialogRef.close();
  }

}
