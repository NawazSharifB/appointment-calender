import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { CreateAppointmentComponent } from '../components/create-appointment/create-appointment.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) {}

  openCreateAppointmentForm(): Observable<any> {
    const dialogRef = this.matDialog.open(CreateAppointmentComponent, {width: '250px'});

    return dialogRef.afterClosed();
  }
}
