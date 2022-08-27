import { RouteParam } from './../../../enums/route-param';
import { RoutePaths } from './../../../enums/route-paths';
import { monthSelection } from './../../constants/month-selection';
import { DialogService } from '../../../shared/services/dialog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MonthSelectionValues } from '../../enums/month-values';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment-config',
  templateUrl: './appointment-config.component.html',
  styleUrls: ['./appointment-config.component.scss']
})
export class AppointmentConfigComponent implements OnInit, OnDestroy {
  monthSelection = monthSelection;
  monthSelectionControl!: FormControl;

  private subscription$ = new Subscription();

  constructor(private dialogService: DialogService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const currentRoute = this.route.snapshot.paramMap.get(RouteParam.NumberOfTheMonth);
    this.createSelectionMonthControl(currentRoute);
    this.changeRouteOnMonthChange();
  }

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

  openAppointmentFormDialog(): void {
    this.subscription$.add(
      this.dialogService.openCreateAppointmentForm().subscribe(),
    );
  }

  private createSelectionMonthControl(currentRouteMonth: string | null): void {
    let initialMonthControlValue: string = MonthSelectionValues.January;
    const currentRouteNumber = currentRouteMonth ? +currentRouteMonth : -1;

    if (!isNaN(currentRouteNumber) && currentRouteNumber >=  +MonthSelectionValues.January && currentRouteNumber <=  +MonthSelectionValues.December) {
      initialMonthControlValue = currentRouteNumber.toString();
    }

    this.monthSelectionControl = new FormControl(initialMonthControlValue);
  }

  private changeRouteOnMonthChange() {
    this.subscription$.add(
      this.monthSelectionControl.valueChanges.subscribe({
        next: value => {
          this.router.navigate([RoutePaths.Month, value]);
        }
      })
    );
  }
}
