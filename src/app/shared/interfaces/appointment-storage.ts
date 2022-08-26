import { AppointmentData } from '../calender/interfaces/appointment-data';

export interface AppointmentStorage {
  [storageKey: string]: AppointmentData[];
}
