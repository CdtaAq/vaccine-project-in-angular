import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AppointmentFormComponent } from './appointment/appointment-form/appointment-form.component';
import { QrPaymentComponent } from './appointment/qr-payment/qr-payment.component';
import { ReportsComponent } from './reports/reports.component';

import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // User routes
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'appointment',
    component: AppointmentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    component: QrPaymentComponent,
    canActivate: [AuthGuard]
  },

  // Admin routes
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
