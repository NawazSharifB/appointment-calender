import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentData } from '../interfaces/appointment-data';
import { AppointmentStorage } from '../interfaces/appointment-storage';
import { DataStoreResponse } from '../interfaces/data-store-response';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly APPOINTMENTS_STORAGE_KEY = 'appointmentData';

  saveData(newAppointmentData: AppointmentData): Observable<DataStoreResponse> {
    const localStorageData: AppointmentStorage  = this.getStoredAppointmentData();

    return new Observable<DataStoreResponse>(observer => {
      if (this.isNewAppointmentDataValid(newAppointmentData, localStorageData)) {
        this.saveAppointmentToLocalStorage(newAppointmentData);
        observer.next({isSuccessful: true})
      } else {
        observer.error(this.getErrorsResponse(newAppointmentData, localStorageData));
      }

      observer.complete();
    })

  }

  private saveAppointmentToLocalStorage(appointmentData: AppointmentData): void {
    const storedData = this.getStoredAppointmentData();

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

  private getErrorsResponse(newAppointmentData: AppointmentData, localStorageData: AppointmentStorage): DataStoreResponse {
    return {
      isSuccessful: false,
      message: 'Another appointment is already scheduled at the same time period'
    };
  }

  private getParsedData(data: string): any | any[] {
    return JSON.parse(data);
  }

  private getStringifiedData(data: any | any[]): string {
    return JSON.stringify(data);
  }
}
