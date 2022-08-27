import { RoutePaths } from './../../../enums/route-paths';
import { monthSelection } from './../../constants/month-selection';
import { DialogService } from '../../../shared/services/dialog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MonthSelectionValues } from '../../enums/month-values';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-config',
  templateUrl: './appointment-config.component.html',
  styleUrls: ['./appointment-config.component.scss']
})
export class AppointmentConfigComponent implements OnInit, OnDestroy {
  monthSelection = monthSelection;
  monthSelectionControl = new FormControl(MonthSelectionValues.January);

  private subscription$ = new Subscription();

  constructor(private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
      this.subscription$.add(
        this.monthSelectionControl.valueChanges.subscribe({
          next: value => {
            this.router.navigate([RoutePaths.Month, value]);
          }
        })
      );
  }

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

  openAppointmentFormDialog(): void {
    this.subscription$.add(
      this.dialogService.openCreateAppointmentForm().subscribe(),
    );
  }
}
