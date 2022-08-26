import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentFormControls } from '../enums/appointment-form-controls';

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
      [AppointmentFormControls.Gender]: [null, [Validators.required]],
      [AppointmentFormControls.Age]: [null, [Validators.required]],
      [AppointmentFormControls.Date]: [null, [Validators.required]],
      [AppointmentFormControls.Time]: this.formBuilder.group({
        [AppointmentFormControls.Hour]: [null, [Validators.required]],
        [AppointmentFormControls.Minute]: [null, [Validators.required]],
        [AppointmentFormControls.Meridiem]: [null, [Validators.required]],
      })
    })
  }
}
