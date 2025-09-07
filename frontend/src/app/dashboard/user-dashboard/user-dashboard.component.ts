import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  bookings: any[] = [];

  messages: { user: string, text: string }[] = [];
  newMessage: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.loadBookings();

    // Subscribe to chat updates
    this.chatService.getMessages().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  loadBookings() {
    this.appointmentService.getUserBookings().subscribe(data => {
      this.bookings = data;
    });
  }

  cancelBooking(id: number) {
    this.appointmentService.cancelBooking(id).subscribe(() => {
      this.loadBookings();
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage({ user: 'User', text: this.newMessage });
      this.newMessage = '';
    }
  }
}
