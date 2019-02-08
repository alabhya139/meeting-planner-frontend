import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = "meetingplannerapi.alabhya.me"
  private socket;

  constructor(public http: HttpClient) { 
    this.socket = io(this.url);
  }

  public setUser = (data)=>{
    this.socket.emit('set-user',data);
  }

  public createdMeeting = (data)=>{
    this.socket.emit('event-created',data)
  }

  public editedMeeting = (data)=>{
    this.socket.emit('event-edited',data)
  }

  public snoozedMeeting = (data)=>{
    this.socket.emit('snooze',data)
  }
}
