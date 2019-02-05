import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  
  constructor(private cookie: CookieService, private router: Router){
  }

  authToken: String
  userId= this.cookie.get('userId') || "";
  isAdmin

  ngOnInit(): void {
    this.isAdmin = this.cookie.get('isAdmin') || false;
  }

  public logout(){
    this.cookie.deleteAll();
    this.router.navigateByUrl("localhost:3000")
  }
}
