import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Meridiem } from '../enums/meridiem';
import { TimePeriodInMilliseconds } from '../enums/time-period-in-milliseconds';
import { AppointmentData } from '../interfaces/appointment-data';
import { AppointmentFormData } from '../interfaces/appointment-form-data';
import { DataStoreResponse } from '../interfaces/data-store-response';
import { EachDayOfMonthAppointment } from '../interfaces/each-day-of-month-appointment';
import { TimePeriodSelection } from '../interfaces/time-period-selection';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  hasCreatedNewAppointment$ = new Subject<boolean>();

  constructor(private storageService: StorageService) {}

  saveData(formData: AppointmentFormData): Observable<DataStoreResponse> {
    const appointmentData: AppointmentData = this.getAppointmentData(formData);

    return this.storageService.saveData(appointmentData);
  }

  getMonthData(date: number): Observable<EachDayOfMonthAppointment> {
    return this.storageService.fetchAppointmentOfTheMonths(date);
  }

  private getAppointmentData(formData: AppointmentFormData): AppointmentData {
    const fullDateTime = this.getDateWithTimePeriod(formData.date, formData.time);
    const appointmentData: AppointmentData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      age: formData.age,
      date: formData.date,
      email: formData.email,
      fullDateTime,
    };

    return appointmentData;
  }

  private getDateWithTimePeriod(dateTime: number, timePeriod: TimePeriodSelection): number {
    const midNightTime = 24;
    const postMeridiemValue = 12;
    let hour = timePeriod.meridiem === Meridiem.PM ? timePeriod.hour + postMeridiemValue : timePeriod.hour;

    if (hour === midNightTime) {
      hour = 0;
    }

    return dateTime + (hour * TimePeriodInMilliseconds.Hour) + (timePeriod.minute * TimePeriodInMilliseconds.Minute);
  }
}
