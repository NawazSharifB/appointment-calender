import { AppointmentData } from './appointment-data';

export interface AppointmentStorage {
  [storageKey: string]: AppointmentData[];
}
