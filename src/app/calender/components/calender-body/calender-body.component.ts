import { EachDayOfMonthAppointment } from '../../../shared/interfaces/each-day-of-month-appointment';
import { DataService } from '../../../shared/services/data.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { eachDayOfInterval, endOfMonth, endOfWeek, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { weekDays } from '../../constants/week-days';
import { finalize, tap } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-calender-body',
  templateUrl: './calender-body.component.html',
  styleUrls: ['./calender-body.component.scss']
})
export class CalenderBodyComponent implements OnChanges, OnInit, OnDestroy {
  @Input() date = Date.now();
  weekDays = weekDays;
  isDataLoading$ = new BehaviorSubject<boolean>(false);
  daysInThisMonth: any[] = [];

  private subscription$ = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('date' in changes) {
      this.getMonthData();
    }
  }

  ngOnInit(): void {
      this.subscription$.add(
        this.dataService.hasCreatedNewAppointment$.subscribe(() => this.getMonthData()),
      );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  private getMonthData(): void {
    this.isDataLoading$.next(true);
    this.subscription$.add(
      this.dataService.getMonthData(this.date).pipe(
        tap(appointmentData => {
          this.setDaysOfMonth(appointmentData, this.date);
        }),
        finalize(() => this.isDataLoading$.next(false)),
      )
      .subscribe(),
    );
  }

  private setDaysOfMonth(appointmentData: EachDayOfMonthAppointment = {}, date = this.date): void {
    this.daysInThisMonth = eachDayOfInterval({
      start: startOfWeek(startOfMonth(this.date)),
      end: endOfWeek(endOfMonth(this.date)),
    }).map((dayOfTheMonth: Date) => {
      return !isSameMonth(dayOfTheMonth, this.date)
        ? undefined
        : {
            date: dayOfTheMonth.getDate(),
            appointmentList: this.getAppointmentListForTheDay(appointmentData, dayOfTheMonth),
          };
    });
  }

  private getAppointmentListForTheDay(appointmentData: EachDayOfMonthAppointment, date: Date) {
    const dateKey = date.getTime().toString();

    return appointmentData[dateKey];

  }
}

