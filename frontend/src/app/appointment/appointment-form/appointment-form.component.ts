import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
  appointmentData = {
    hospitalId: '',
    vaccineId: '',
    date: '',
    time: ''
  };
  successMessage = '';

  constructor(private appointmentService: AppointmentService) {}

  onSubmit() {
    this.appointmentService.bookAppointment(this.appointmentData).subscribe({
      next: (res) => {
        this.successMessage = 'Appointment booked successfully!';
      },
      error: () => {
        this.successMessage = 'Failed to book appointment!';
      }
    });
  }
}
