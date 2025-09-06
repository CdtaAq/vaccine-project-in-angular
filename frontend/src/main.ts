import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/auth.interceptor';


bootstrapApplication(AppComponent, {
providers: [
provideRouter(routes),
importProvidersFrom(HttpClientModule),
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]
});
