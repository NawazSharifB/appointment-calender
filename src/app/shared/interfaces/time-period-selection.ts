import { Meridiem } from '../enums/meridiem';

export interface TimePeriodSelection {
  hour: number;
  minute: number;
  meridiem: Meridiem;
}
