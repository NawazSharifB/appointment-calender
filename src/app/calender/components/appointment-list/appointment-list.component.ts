import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../shared/services/dialog.service';
import { AppointmentData } from './../../../shared/interfaces/appointment-data';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnDestroy {
  @Input() appointmentList: AppointmentData[] = [];

  private maxAllowedItemInSingleView = 2;
  private subscription$ = new Subscription();

  constructor(private dialogService: DialogService) {}

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  get shouldHaveScroll(): boolean {
    return this.appointmentList.length > this.maxAllowedItemInSingleView;
  }

  showAppointmentDetails(appointment: AppointmentData): void {
    this.subscription$.add(this.dialogService.openAppointmentInfoDialog(appointment).subscribe());
  }
}
