import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private api: ApiService) {}

  // Backend endpoints (placeholders — implement on server):
   GET /reports/doses-per-day -> [{ date: '2025-09-01', count: 120 }, ...]
   GET /reports/population-coverage -> { total:10000, vaccinated:6500 }
   GET /reports/age-gender -> { age: [{ageGroup:'18-25', count:100}], gender: [{gender:'Male', count:200}] }

  dosesPerDay(): Observable<any> {
    return this.api.get('/reports/doses-per-day');
  }

  populationCoverage(): Observable<any> {
    return this.api.get('/reports/population-coverage');
  }

  ageGender(): Observable<any> {
    return this.api.get('/reports/age-gender');
  }
}
