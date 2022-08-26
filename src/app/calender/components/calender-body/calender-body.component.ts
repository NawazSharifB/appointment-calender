import { Component, Input, OnInit } from '@angular/core';
import { eachDayOfInterval, endOfMonth, endOfWeek, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { weekDays } from '../../constants/week-days';

@Component({
  selector: 'app-calender-body',
  templateUrl: './calender-body.component.html',
  styleUrls: ['./calender-body.component.scss']
})
export class CalenderBodyComponent implements OnInit {
  @Input() date = Date.now();
  // @Input() date = new Date(2022, 8, 19).getTime();

  weekDays = weekDays;
  daysInThisMonth: any[] = [];

  ngOnInit(): void {
    this.setDaysOfMonth();
  }

  private setDaysOfMonth(): void {
    this.daysInThisMonth = eachDayOfInterval({
      start: startOfWeek(startOfMonth(this.date)),
      end: endOfWeek(endOfMonth(this.date)),
    }).map((item: Date) => {
      return !isSameMonth(item, this.date)
        ? undefined
        : {
            date: item.getDate(),
            hello: 'world',
            list: [2, 4],
          };
    });
    console.log(this.daysInThisMonth);
  }
}
