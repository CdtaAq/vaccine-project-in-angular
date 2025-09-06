import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) {}

  bookAppointment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, data);
  }

  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
