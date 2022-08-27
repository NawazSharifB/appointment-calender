import { RoutePaths } from './../enums/route-paths';
import { RouteParam } from './../enums/route-param';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { getYear, startOfToday } from 'date-fns';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, OnDestroy {
  dateToShowCalender = Date.now();
  private subscription$ = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscription$.add(
      this.route.paramMap.pipe(
        filter(param => {
          if (param.has(RouteParam.NumberOfTheMonth)) {
            return true;
          }

          this.goToNotFoundPage();

          return false;
        }),
        filter(param => {
          const numberOfMonth = +<string>param.get(RouteParam.NumberOfTheMonth);
          const minMonthValue = 1;
          const maxMonthValue = 12;

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
