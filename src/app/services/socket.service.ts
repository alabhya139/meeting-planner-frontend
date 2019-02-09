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

  public onVerify = (userDetails)=>{
    return Observable.create((observer)=>{
      this.socket.on('verify-user',data=>{
        observer.next(data);
        this.socket.emit('set-user',userDetails);
      })
    })
  }

  public onCreateEvent =(userId)=>{
    return Observable.create((observer)=>{
      this.socket.on(userId,(data)=>{
        observer.next(data);
      })
    })
  }

  public onEditEvent =(userId)=>{
    return Observable.create((observer)=>{
      this.socket.on(userId,(data)=>{
        observer.next(data);
      })
    })
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
