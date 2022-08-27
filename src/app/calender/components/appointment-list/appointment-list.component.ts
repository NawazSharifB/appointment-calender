import { AppointmentData } from './../../../shared/interfaces/appointment-data';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  @Input() appointmentList: AppointmentData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  showAppointmentDetails(appointment: AppointmentData): void {
    console.log(appointment);
  }

}
