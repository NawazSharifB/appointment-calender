import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { DataService } from './../../../shared/services/data.service';
import { AppointmentFormService } from './../../services/appointment-form.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { minuteSelection } from '../../constants/minute-selection';
import { hourSelection } from '../../constants/hour-selection';
import { meridiemSelection } from '../../constants/meridiem-selection';
import { genderSelection } from '../../constants/gender-selection';
import { AppointmentFormControls } from '../../enums/appointment-form-controls';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit, OnDestroy {
  genderSelection = genderSelection;
  hourSelection =  hourSelection;
  minuteSelection = minuteSelection;
  meridiemSelection = meridiemSelection;

  private subscription$ = new Subscription();

  constructor(
    private appointmentFormService: AppointmentFormService,
    private dataService: DataService,
    private matDialogRef: MatDialogRef<CreateAppointmentComponent>,
    ) { }

  ngOnInit(): void {
    this.appointmentFormService.createForm();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  get appointmentForm(): FormGroup {
    return this.appointmentFormService.appointForm;
  }

  get firstName(): AbstractControl {
    return this.appointmentFormService.firstName;
  }

  get lastName(): AbstractControl {
    return this.appointmentFormService.lastName;
  }

  get email(): AbstractControl {
    return this.appointmentFormService.email;
  }

  get gender(): AbstractControl {
    return this.appointmentFormService.gender;
  }

  get age(): AbstractControl {
    return this.appointmentFormService.age;
  }

  get date(): AbstractControl {
    return this.appointmentFormService.date;
  }

  get time(): FormGroup {
    return this.appointmentFormService.time;
  }

  get hour(): AbstractControl {
    return this.appointmentFormService.hour;
  }

  get minute(): AbstractControl {
    return this.appointmentFormService.minute;
  }

  get meridiem(): AbstractControl {
    return this.appointmentFormService.meridiem;
  }

  closeDialogBox(value = false): void {
    this.matDialogRef.close(value);
  }

  createAppointment(): void {
    if (this.appointmentForm.valid) {
      const formValue = this.modifyFormValue(this.appointmentFormService.appointForm.value);

      this.subscription$.add(
        this.dataService.saveData(formValue).pipe(
          filter(response => {
            return response.isSuccessful;
          }),
          tap(() => {
            this.dataService.hasCreatedNewAppointment$.next(true);
            this.closeDialogBox(true);
          }),
        )
        .subscribe({
          next: value => {
            console.log('value', value);
          }
        }),
      );
    }
  }

  private modifyFormValue(formValue: any) {
    formValue[AppointmentFormControls.Date] = startOfDay(formValue[AppointmentFormControls.Date]).getTime();

    return formValue;
  }

}
