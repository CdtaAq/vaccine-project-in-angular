import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AppointmentFormComponent } from './appointment/appointment-form/appointment-form.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';


export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
{ path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
{ path: 'book', component: AppointmentFormComponent, canActivate: [AuthGuard] },
{ path: 'reports', component: ReportsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
{ path: '**', redirectTo: 'login' }
];
