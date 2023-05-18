import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateAppointmentComponent } from '../../appointment-config/components/create-appointment/create-appointment.component';
import { AppointmentDetailsComponent } from '../../calender/components/appointment-details/appointment-details.component';
import { ToastMessages } from '../constants/toast-messages';
import { AppointmentData } from '../interfaces/appointment-data';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialogBoxWidth = '450px';

  constructor(private matDialog: MatDialog, private snackbar: MatSnackBar) {}

  openCreateAppointmentForm(): Observable<boolean> {
    const dialogRef =
      this.matDialog.open(
        CreateAppointmentComponent,
        { width: this.dialogBoxWidth, panelClass: ['detail-container'] },
      );

    return dialogRef.afterClosed().pipe(
      tap(hasCreatedAppointment => {
        if (hasCreatedAppointment) {
          this.snackbar.open(ToastMessages.AppointmentCreationSuccessful, '', { duration: 2500 })
        }
      })
    );
  }

  openAppointmentInfoDialog(appointmentInfo: AppointmentData): Observable<void> {
    const dialogRef =
      this.matDialog.open(
        AppointmentDetailsComponent,
        { width: this.dialogBoxWidth, data: appointmentInfo, panelClass: ['detail-container'] },
      );

    return dialogRef.afterClosed();
  }
}
