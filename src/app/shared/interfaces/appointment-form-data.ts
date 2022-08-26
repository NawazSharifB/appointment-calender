import { AppointmentData } from './appointment-data';
import { TimePeriodSelection } from './time-period-selection';

export interface AppointmentFormData extends Omit<AppointmentData, 'fullDateTime'> {
  time: TimePeriodSelection;
}
