import { DialogService } from '../../../shared/services/dialog.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-config',
  templateUrl: './appointment-config.component.html',
  styleUrls: ['./appointment-config.component.scss']
})
export class AppointmentConfigComponent implements OnDestroy {
  private subscription$ = new Subscription();

  constructor(private dialogService: DialogService) {}

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

  openAppointmentFormDialog(): void {
    this.subscription$.add(
      this.dialogService.openCreateAppointmentForm().subscribe(),
    );
  }
}
