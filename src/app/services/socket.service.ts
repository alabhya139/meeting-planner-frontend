import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = "localhost:3000"
  private socket;

  constructor(public http: HttpClient) { 
    this.socket = io(this.url);
  }

  public testSocket = ()=>{
    return Observable.create((observer)=>{
      this.socket.on('verify-user',()=>{
        observer.next("Hello Dear")
      })
    })
  }
}
