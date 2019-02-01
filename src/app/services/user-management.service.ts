import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  baseUrl = "http://localhost:3000/api/v1/"
  constructor(private http: HttpClient) { }

  public loginFunction(data):Observable<any> {

    const params = new HttpParams()
      .set('email',data.email)
      .set('password',data.password);
    return this.http.post(`${this.baseUrl}login`,params);
  }
}
