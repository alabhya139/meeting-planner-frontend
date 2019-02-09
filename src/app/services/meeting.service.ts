import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private  baseUrl = "http://meetingplannerapi.alabhya.me/api/v1/";

  constructor(private http: HttpClient) { }

  public getAllMeetings = ()=>{
    return this.http.get(`${this.baseUrl}get-meetings`);
  }

  public createMeetings(data): Observable<any>{
    const params = new HttpParams()
      .set('userId',data.userId)
      .set('adminId',data.adminId)
      .set('startDate',data.startDate)
      .set('endDate',data.endDate)
      .set('startHour',data.startHour)
      .set('endHour',data.endHour)
      .set('s_hour',data.s_Hour)
      .set('s_min',data.startMinute)
      .set('s_time',data.startTime)
      .set('e_hour',data.e_Hour)
      .set('e_min',data.endMinute)
      .set('e_time',data.endTime)
      .set('meetingTitle',data.meetingTitle)
      .set('meetingPlace',data.meetingPlace)
      .set('meetingDescription',data.meetingDescription);


      return this.http.post(`${this.baseUrl}createMeeting`,params);
  }

  public getUserMeetings = (userId):Observable<any>=>{
    const params = new HttpParams()
      .set('authToken',localStorage.getItem('authToken'));
    
    return this.http.get(`${this.baseUrl}get-meetings-by-user/${userId}`);
  }

  public getAdminMeetings = (userId):Observable<any>=>{

    const params = new HttpParams()
      .set('authToken',localStorage.getItem('authToken'));
    
    return this.http.get(`${this.baseUrl}get-meetings-by-admin/${userId}`);
  }

  public getMeetingById = (meetingId):Observable<any>=>{
    const params = new HttpParams()
      .set('authToken',localStorage.getItem('authToken'));
    
    return this.http.get(`${this.baseUrl}get-meeting-by-id/${meetingId}`);
  }

  public editMeetings(meetingId,data): Observable<any>{
    const params = new HttpParams()
      .set('userId',data.userId)
      .set('adminId',data.adminId)
      .set('startDate',data.startDate)
      .set('endDate',data.endDate)
      .set('startHour',data.startHour)
      .set('endHour',data.endHour)
      .set('s_hour',data.s_Hour)
      .set('s_min',data.startMinute)
      .set('s_time',data.startTime)
      .set('e_hour',data.e_Hour)
      .set('e_min',data.endMinute)
      .set('e_time',data.endTime)
      .set('meetingTitle',data.meetingTitle)
      .set('meetingPlace',data.meetingPlace)
      .set('meetingDescription',data.meetingDescription);


      return this.http.post(`${this.baseUrl}editMeeting?meetingId=${meetingId}`,params);
  }

  public deleteMeeting(meetingId): Observable<any>{

    const params = new HttpParams()
     .set('meetingId',meetingId);
    return this.http.get(`${this.baseUrl}delete-meeting`,{params});
  }
}
