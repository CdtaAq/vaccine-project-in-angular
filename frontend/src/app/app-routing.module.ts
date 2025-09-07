import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentFormComponent } from './appointment/appointment-form/appointment-form.component';
import { QrPaymentComponent } from './appointment/qr-payment/qr-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentFormComponent,
    QrPaymentComponent
    // other components...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
