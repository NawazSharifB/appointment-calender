import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getYear, startOfToday } from 'date-fns';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MonthSelectionValues } from '../appointment-config/enums/month-values';
import { RouteParam } from '../enums/route-param';
import { RoutePaths } from '../enums/route-paths';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, OnDestroy {
  dateToShowCalender = Date.now();

  private subscription$ = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.activatedRoute.paramMap.pipe(
        filter(param => {
          if (param.has(RouteParam.NumberOfTheMonth)) {
            return true;
          }

          this.goToNotFoundPage();

          return false;
        }),
        filter(param => {
          const numberOfMonth = +<string>param.get(RouteParam.NumberOfTheMonth);
          const minMonthValue = +MonthSelectionValues.January;
          const maxMonthValue = +MonthSelectionValues.December;

          if (!isNaN(numberOfMonth) && numberOfMonth >= minMonthValue && numberOfMonth <= maxMonthValue) {
            return true;
          }
          this.goToNotFoundPage();

          return false;
        }),
        map(param => {
          const numberOfTheMonth = +<string>param.get(RouteParam.NumberOfTheMonth) - 1;

          return new Date(getYear(startOfToday()), numberOfTheMonth).getTime();
        })
      ).subscribe({
        next: date => {
          this.dateToShowCalender = date;
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private goToNotFoundPage(): void {
    this.router.navigate([`/${RoutePaths.NotFound}`]);
  }

}
