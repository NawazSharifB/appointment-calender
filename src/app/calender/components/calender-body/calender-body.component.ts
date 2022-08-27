import { EachDayOfMonthAppointment } from '../../../shared/interfaces/each-day-of-month-appointment';
import { DataService } from '../../../shared/services/data.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { eachDayOfInterval, endOfMonth, endOfWeek, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { weekDays } from '../../constants/week-days';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calender-body',
  templateUrl: './calender-body.component.html',
  styleUrls: ['./calender-body.component.scss']
})
export class CalenderBodyComponent implements OnInit, OnDestroy {
  @Input() date = Date.now();

  private subscription$ = new Subscription();

  constructor(private dataService: DataService) {}

  weekDays = weekDays;
  daysInThisMonth: any[] = [];

  ngOnInit(): void {
    this.getMonthData();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  getMonthData(): void {
    const date = new Date(2022, 7, 20);

    this.subscription$.add(
      this.dataService.getMonthData(date.getTime()).pipe(
        tap(appointmentData => {
          this.setDaysOfMonth(appointmentData, date.getTime());
        })
      )
      .subscribe(),
    );
  }

  private setDaysOfMonth(appointmentData: EachDayOfMonthAppointment = {}, date = this.date): void {
    this.daysInThisMonth = eachDayOfInterval({
      start: startOfWeek(startOfMonth(this.date)),
      end: endOfWeek(endOfMonth(this.date)),
    }).map((item: Date) => {
      return !isSameMonth(item, this.date)
        ? undefined
        : {
            date: item.getDate(),
            hello: 'world',
            appointmentList: this.getAppointmentListForTheDay(appointmentData, item),
          };
    });
  }

  private getAppointmentListForTheDay(appointmentData: EachDayOfMonthAppointment, date: Date) {
    const dateKey = date.getTime().toString();

    return appointmentData[dateKey];

  }
}

