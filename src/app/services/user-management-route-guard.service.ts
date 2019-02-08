import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementRouteGuardService {

  constructor(private router: Router,private cookie:CookieService) { }


  canActivate(route: ActivatedRouteSnapshot):boolean{
    if(localStorage.getItem('authToken')===undefined || localStorage.getItem('authToken')==="" || localStorage.getItem('authToken')===null){
      return true;
    }else {
      if(localStorage.getItem('isAdmin')==='true'){
        this.router.navigate([`/admin/${localStorage.getItem('userId')}`])
      }else {
        this.router.navigate([`/user/${localStorage.getItem('userId')}`])
      }
      return false;
    }
  }
}
