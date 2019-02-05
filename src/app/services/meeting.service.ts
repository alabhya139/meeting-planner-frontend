import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private  baseUrl = "http://localhost:3000/api/v1/";

  constructor(private http: HttpClient) { }

  public getAllMeetings = ()=>{
    return this.http.get(`${this.baseUrl}get-meetings`)
  }
}
