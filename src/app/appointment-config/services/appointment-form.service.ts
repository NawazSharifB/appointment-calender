import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meridiem } from '../../shared/enums/meridiem';
import { AppointmentFormControls } from '../enums/appointment-form-controls';
import { AvailableGenders } from '../enums/available-genders';

@Injectable({
  providedIn: 'root'
})
export class AppointmentFormService {
  appointForm!: FormGroup;

  private maxNameLength = 40;

  constructor(private formBuilder: FormBuilder) {}

  get firstName(): AbstractControl {
    return <AbstractControl>this.appointForm.get(AppointmentFormControls.FirstName);
  }

  get lastName(): AbstractControl {
    return <AbstractControl>this.appointForm.get(AppointmentFormControls.LastName);
  }

  get email(): AbstractControl {
    return <AbstractControl>this.appointForm.get(AppointmentFormControls.Email);
  }

  get gender(): AbstractControl {
    return <AbstractControl>this.appointForm.get(AppointmentFormControls.Gender);
  }

  get age(): AbstractControl {
    return <AbstractControl>this.appointForm.get(AppointmentFormControls.Age);
  }

  get date(): AbstractControl {
    return <AbstractControl>this.appointForm.get(AppointmentFormControls.Date);
  }

  get time(): FormGroup {
    return <FormGroup>this.appointForm.get(AppointmentFormControls.Time);
  }

  get hour(): AbstractControl {
    return <AbstractControl>this.time.get('hour');
  }

  get minute(): AbstractControl {
    return <AbstractControl>this.time.get('minute');
  }

  get meridiem(): AbstractControl {
    return <AbstractControl>this.time.get('meridiem');
  }

  createForm(): void {
    this.appointForm = this.formBuilder.group({
      [AppointmentFormControls.FirstName]: [null, [Validators.required, Validators.maxLength(this.maxNameLength)]],
      [AppointmentFormControls.LastName]: [null, [Validators.required, Validators.maxLength(this.maxNameLength)]],
      [AppointmentFormControls.Email]: [null, [Validators.required, Validators.email]],
      [AppointmentFormControls.Gender]: [AvailableGenders.Male, [Validators.required]],
      [AppointmentFormControls.Age]: [null, [Validators.max(200)]],
      [AppointmentFormControls.Date]: [null, [Validators.required]],
      [AppointmentFormControls.Time]: this.formBuilder.group({
        [AppointmentFormControls.Hour]: [10, [Validators.required]],
        [AppointmentFormControls.Minute]: [0, [Validators.required]],
        [AppointmentFormControls.Meridiem]: [Meridiem.AM, [Validators.required]],
      })
    })
  }
}
