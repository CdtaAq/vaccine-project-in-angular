import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: Socket;

  constructor() {
    // replace with your socket server URL
    this.socket = io('http://localhost:4000', {
      transports: ['websocket']
      // you can pass auth token like: auth: { token: localStorage.getItem('jwt_token') }
    });
  }

  sendMessage(room: string, payload: any) {
    this.socket.emit('chat.message', { room, ...payload });
  }

  joinRoom(room: string) {
    this.socket.emit('chat.join', { room });
  }

  leaveRoom(room: string) {
    this.socket.emit('chat.leave', { room });
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chat.message', (msg: any) => observer.next(msg));
      // cleanup
      return () => this.socket.off('chat.message');
    });
  }

  onSystem(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('system', (data: any) => observer.next(data));
      return () => this.socket.off('system');
    });
  }
}
