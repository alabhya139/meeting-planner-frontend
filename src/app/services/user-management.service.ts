import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  baseUrl = "http://meetingplannerapi.alabhya.me/api/v1/"
  constructor(private http: HttpClient) { }

  public loginFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.baseUrl}login`, params);
  }

  public signUpFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('email', data.email)
      .set('mobileNumber', data.mobileNumber)
      .set('password', data.password)
      .set('isAdmin', data.isAdmin);

    return this.http.post(`${this.baseUrl}signup`, params);
  }

  public getAllUser = ()=>{
    const param = new HttpParams()
      .set('authToken',localStorage.getItem('authToken'));
    
    return this.http.get(`${this.baseUrl}getUsers`,{params:param});
  }

  public getUserById = (userId)=>{
    const param = new HttpParams()
      .set('userId',userId);
    
    return this.http.get(`${this.baseUrl}getUsersById`,{params:param});
  }

  public sendEmail = (email)=>{
    const param = new HttpParams()
      .set('email',email);
    return this.http.post(`${this.baseUrl}forgot-password-send-email`, param);
  }

  public changePassword = (token,password)=>{
    const param = new HttpParams()
     .set('password',password)
    const params = new HttpParams()
      .set('token',token);
    return this.http.post(`${this.baseUrl}change-password`,param, {params});  
  }
}
