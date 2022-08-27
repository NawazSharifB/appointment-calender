import { EachDayOfMonthAppointment } from './../../../shared/interfaces/each-day-of-month-appointment';
import { DataService } from './../../../shared/services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { eachDayOfInterval, endOfMonth, endOfWeek, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { weekDays } from '../../constants/week-days';
import { appointmentList } from '../../dummy/appointment-data';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-calender-body',
  templateUrl: './calender-body.component.html',
  styleUrls: ['./calender-body.component.scss']
})
export class CalenderBodyComponent implements OnInit {
  dd = appointmentList;
  @Input() date = Date.now();

  constructor(private dataService: DataService) {}
  // @Input() date = new Date(2022, 8, 19).getTime();

  weekDays = weekDays;
  daysInThisMonth: any[] = [];

  ngOnInit(): void {
    // this.setDaysOfMonth();
    this.getMonthData();
  }

  getMonthData(): void {
    const date = new Date(2022, 7, 20);

    this.dataService.getMonthData(date.getTime()).pipe(
      tap(appointmentData => {
        this.setDaysOfMonth(appointmentData, date.getTime());
      })
    ).subscribe(data => {
      // console.log(data);
    });
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
            appointmentList: this.ddd(appointmentData, item),
          };
    });
    console.log(this.daysInThisMonth);
  }

  private ddd(appointmentData: EachDayOfMonthAppointment, date: Date) {
    const dateKey = date.getTime().toString();

    console.log(appointmentData[dateKey]);

    return appointmentData[dateKey];

  }
}

