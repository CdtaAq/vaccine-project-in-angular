import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: any = {};
  revenueData: any[] = [];
  occupancyData: any[] = [];

  messages: { user: string, text: string }[] = [];
  newMessage: string = '';

  constructor(
    private reportsService: ReportsService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.loadReports();

    // Subscribe to chat updates
    this.chatService.getMessages().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  loadReports() {
    this.reportsService.getRevenueReport().subscribe(data => {
      this.revenueData = data;
    });
    this.reportsService.getOccupancyReport().subscribe(data => {
      this.occupancyData = data;
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage({ user: 'Admin', text: this.newMessage });
      this.newMessage = '';
    }
  }
}
