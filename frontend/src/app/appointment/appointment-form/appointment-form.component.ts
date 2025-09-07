import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
  appointmentForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      hospitalId: ['', Validators.required],
      vaccineId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid) {
      this.errorMessage = 'Please correct errors before submitting!';
      return;
    }

    this.appointmentService.bookAppointment(this.appointmentForm.value).subscribe({
      next: () => {
        this.successMessage = 'Appointment booked successfully!';
        this.errorMessage = '';
        this.appointmentForm.reset();
      },
      error: () => {
        this.errorMessage = 'Failed to book appointment!';
        this.successMessage = '';
      }
    });
  }
}
