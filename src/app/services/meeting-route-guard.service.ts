import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class MeetingRouteGuardService implements CanActivate{
  

  constructor(private router: Router,private cookie:CookieService) { }

  canActivate(route: ActivatedRouteSnapshot):boolean{
    if(this.cookie.get('authToken')===undefined || this.cookie.get('authToken')==="" || this.cookie.get('authToken')===null){
      this.router.navigate(['/']);
      console.log("Access Denied")
      return false;
    }else {
      return true;
    }
  }
}
