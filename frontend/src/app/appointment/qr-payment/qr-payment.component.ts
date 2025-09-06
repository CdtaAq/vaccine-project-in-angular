import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-payment',
  templateUrl: './qr-payment.component.html',
  styleUrls: ['./qr-payment.component.css']
})
export class QrPaymentComponent {
  @Input() amount: number = 0;
  qrCodeUrl: SafeUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  generateQRCode() {
    const paymentInfo = `pay://vaccination?amount=${this.amount}`;
    QRCode.toDataURL(paymentInfo, (err, url) => {
      if (!err) {
        this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      }
    });
  }
}
