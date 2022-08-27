import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentData } from '../interfaces/appointment-data';
import { AppointmentStorage } from '../interfaces/appointment-storage';
import { DataStoreResponse } from '../interfaces/data-store-response';
import { startOfMonth, endOfMonth, eachDayOfInterval, startOfDay, endOfDay } from 'date-fns';
import { EachDayOfMonthAppointment } from '../interfaces/each-day-of-month-appointment';
import { ServerMessages } from '../constants/server-messages';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly APPOINTMENTS_STORAGE_KEY = 'appointmentData';

  saveData(newAppointmentData: AppointmentData): Observable<DataStoreResponse> {
    const localStorageData: AppointmentStorage  = this.getStoredAppointmentData();

    return new Observable<DataStoreResponse>(observer => {
      if (this.isNewAppointmentDataValid(newAppointmentData, localStorageData)) {
        const modifiedAllAppointments = this.updateAppointmentTitle(newAppointmentData, localStorageData);
        this.saveAppointmentToLocalStorage(newAppointmentData, modifiedAllAppointments);
        setTimeout(() => observer.next({isSuccessful: true}), 2000);
      } else {
        setTimeout(() => observer.error(this.getErrorsResponse(newAppointmentData, localStorageData)), 2000);
      }

      setTimeout(() => observer.complete(), 2500);
    })
  }

  fetchAppointmentOfTheMonths(monthTime: number): Observable<EachDayOfMonthAppointment> {
    const startOfTheMonth = startOfMonth(monthTime).getTime();
    const endOfTheMonth = endOfMonth(monthTime).getTime();

    return new Observable<EachDayOfMonthAppointment>(observer => {
      const storedAppointments = this.getStoredAppointmentData();
      const appointmentsOfThisMonth = this.getThisMonthsAppointments(startOfTheMonth, endOfTheMonth, storedAppointments);
      const appointmentOfEachDayOfMonth = this.getAppointmentOfEachDayOfMonth(monthTime, appointmentsOfThisMonth);

      observer.next(appointmentOfEachDayOfMonth);
    })
  }

  private getAppointmentOfEachDayOfMonth(monthTime: number, appointmentsOfThisMonth: AppointmentData[]): EachDayOfMonthAppointment {
    const eachDayOfTheMonth = eachDayOfInterval({
      start: startOfMonth(monthTime),
      end: endOfMonth(monthTime),
    }).map(date => date.getTime());

    const appointmentsOfTheDay: AppointmentStorage = {};

    eachDayOfTheMonth.forEach(dayOfTheMonth => {
      appointmentsOfTheDay[dayOfTheMonth.toString()] = [];

      appointmentsOfThisMonth.forEach(appointment => {
        const startOfTheDay = dayOfTheMonth;
        const endOfTheDay = endOfDay(dayOfTheMonth).getTime();

        if (startOfTheDay <= appointment.fullDateTime && endOfTheDay >= appointment.fullDateTime) {
          appointmentsOfTheDay[dayOfTheMonth.toString()].push(appointment);
        }
      });

      appointmentsOfTheDay[dayOfTheMonth.toString()].sort((a, b) => a.fullDateTime - b.fullDateTime);
    });

    return appointmentsOfTheDay;
  }

  private getThisMonthsAppointments(startTime: number, endTime: number, allAppointments: AppointmentStorage): AppointmentData[] {
    const thisMonthsAppointments: AppointmentData[] = [];

    Object.entries(allAppointments).forEach(([key, appointmentList]) => {
      const keyInNumber = +key;
      if (keyInNumber >= startTime && keyInNumber <= endTime ) {
        thisMonthsAppointments.push(...appointmentList);
      }
    })

    return thisMonthsAppointments;
  }

  private saveAppointmentToLocalStorage(appointmentData: AppointmentData, storedData: AppointmentStorage): void {
    storedData[appointmentData.date] = [...(storedData[appointmentData.date] || []), appointmentData];
    localStorage.setItem(this.APPOINTMENTS_STORAGE_KEY, this.getStringifiedData(storedData));
  }

  private getStoredAppointmentData(): AppointmentStorage {
    const stringifiedAppointmentData = localStorage.getItem(this.APPOINTMENTS_STORAGE_KEY);

    return stringifiedAppointmentData ? this.getParsedData(stringifiedAppointmentData) : {};
  }

  private isNewAppointmentDataValid(newAppointmentData: AppointmentData, savedAppointmentData: AppointmentStorage): boolean {
    const alreadyAppointedInSameDate = Object.entries(savedAppointmentData).filter(([key, appointments]) => {
      if (key === newAppointmentData.date.toString()) {
        return !!appointments.filter(appointment => appointment.fullDateTime === newAppointmentData.fullDateTime).length;
      }

      return false;
    });

    return !!!alreadyAppointedInSameDate.length;
  }

  private updateAppointmentTitle(newAppointmentData: AppointmentData, savedAppointmentData: AppointmentStorage): AppointmentStorage {
    const allAppointments: AppointmentData[] = [newAppointmentData];

    Object.entries(savedAppointmentData).forEach(([key, appointments]) => {
      allAppointments.push(...appointments);
    });

    allAppointments.sort((a, b) => a.fullDateTime - b.fullDateTime);

    allAppointments.forEach((appointment, index) => {
      appointment.appointmentTitle = `Appointment ${index + 1}`;
    })

    return savedAppointmentData;
  }

  private getErrorsResponse(newAppointmentData: AppointmentData, localStorageData: AppointmentStorage): DataStoreResponse {
    return {
      isSuccessful: false,
      message: ServerMessages.AlreadyHasAnAppointment
    };
  }

  private getParsedData(data: string): any | any[] {
    return JSON.parse(data);
  }

  private getStringifiedData(data: any | any[]): string {
    return JSON.stringify(data);
  }
}
