import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, OnDestroy {
  @Input() room: string | null = null; // optional: room id (e.g., appointmentId or userId)
  messages: any[] = [];
  messageText = '';
  private sub!: Subscription;

  constructor(private chat: ChatService, public auth: AuthService) {}

  ngOnInit() {
    const room = this.room || `user-${this.auth.getToken() ? 'anon' : 'guest'}`;
    this.chat.joinRoom(room);
    this.sub = this.chat.onMessage().subscribe((msg:any) => {
      this.messages.push(msg);
    });
  }

  send() {
    if (!this.messageText.trim()) return;
    const payload = { text: this.messageText, sender: this.auth.getToken() ? 'user' : 'guest', ts: Date.now() };
    this.chat.sendMessage(this.room || 'global', payload);
    this.messages.push(payload);
    this.messageText = '';
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    if (this.room) this.chat.leaveRoom(this.room);
  }
}
