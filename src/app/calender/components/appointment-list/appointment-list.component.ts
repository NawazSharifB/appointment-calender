import { DialogService } from '../../../shared/services/dialog.service';
import { AppointmentData } from './../../../shared/interfaces/appointment-data';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnDestroy {
  @Input() appointmentList: AppointmentData[] = [];

  private subscription$ = new Subscription();

  constructor(private dialogService: DialogService) {}

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  showAppointmentDetails(appointment: AppointmentData): void {
    this.subscription$.add(this.dialogService.openAppointmentInfoDialog(appointment).subscribe());
  }
}
