import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class MeetingRouteGuardService implements CanActivate{
  

  constructor(private router: Router,private cookie:CookieService) { }


  canActivate(route: ActivatedRouteSnapshot):boolean{
    if(localStorage.getItem('authToken')===undefined || localStorage.getItem('authToken')==="" || localStorage.getItem('authToken')===null){
      this.router.navigate(['/home/login'])
      console.log("Access Denied"+localStorage.getItem('authToken'));
      return false;
    }else {
      return true;
    }
  }

  canDeactivate
}
