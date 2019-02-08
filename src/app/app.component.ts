import { Component, OnInit, DoCheck } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck {


  constructor(private cookie: CookieService, private router: Router, private route: ActivatedRoute) {
  }

  authToken: String
  userId = localStorage.getItem('userId') || "";
  isAdmin = localStorage.getItem('isAdmin');
  isLogged
  user:string


  ngDoCheck(){
    if(this.isAdmin === 'true'){
      this.user = "admin"
    }else this.user = "user"
    this.isLogged = localStorage.getItem('isLogged');
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('authToken'))
  }

  public logout() {
    localStorage.clear();
    this.isLogged = "false";
    this.router.navigate(['/home/login'])
  }

  getCookieNames = function (cookie) {
    var cookieArray = cookie.split('=');
    return cookieArray[0].trim();
  };

  getCookiebyName = function (name) {
    var pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return !!pair ? pair[1] : null;
  };
}
