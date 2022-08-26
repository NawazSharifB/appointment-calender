import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meridiem } from '../enums/meridiem';
import { TimePeriodInMilliseconds } from '../enums/time-period-in-milliseconds';
import { AppointmentData } from '../interfaces/appointment-data';
import { AppointmentFormData } from '../interfaces/appointment-form-data';
import { DataStoreResponse } from '../interfaces/data-store-response';
import { TimePeriodSelection } from '../interfaces/time-period-selection';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storageService: StorageService) {}

  saveData(formData: AppointmentFormData): Observable<DataStoreResponse> {
    const appointmentData: AppointmentData = this.getAppointmentData(formData);

    return this.storageService.saveData(appointmentData);
  }

  private getAppointmentData(formData: AppointmentFormData): AppointmentData {
    const fullDateTime = this.getDateWithTimePeriod(formData.date, formData.time);
    const appointmentData: AppointmentData = {
      ...formData,
      fullDateTime,
    };

    return appointmentData;
  }

  private getDateWithTimePeriod(dateTime: number, timePeriod: TimePeriodSelection): number {
    const midNightTime = 24;
    const postMeridiemValue = 12;
    let hour = timePeriod.meridiem === Meridiem.PM ? timePeriod.hour+= postMeridiemValue : timePeriod.hour;

    if (hour === midNightTime) {
      hour = 0;
    }

    return dateTime + (hour * TimePeriodInMilliseconds.Hour) + (timePeriod.minute * TimePeriodInMilliseconds.Minute);
  }
}
