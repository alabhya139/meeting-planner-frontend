import { Component, OnInit, DoCheck } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserManagementService } from './services/user-management.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {


  constructor(
    private userService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService) {
  }

  authToken =localStorage.getItem('authToken')
  userId = localStorage.getItem('userId') || "";
  isAdmin = localStorage.getItem('isAdmin');
  isLogged
  logoutResponse
  user: string


  ngDoCheck() {
    if (this.isAdmin === 'true') {
      this.user = "admin"
    } else this.user = "user"
    this.isLogged = localStorage.getItem('isLogged');
  }

  ngOnInit(): void {
    console.log()
  }

  public logout() {
    this.userService.logout(this.userId).subscribe(
      data => {
        this.logoutResponse = data
        console.log(this.logoutResponse.error)
        if (this.logoutResponse.error === false) {
          this.toaster.success('Success', this.logoutResponse.message);
          localStorage.clear();
          this.isLogged = "false";
          this.router.navigate(['/home/login'])
        }else{
          console.log("worked")
          this.toaster.error('Error', this.logoutResponse.message);
        }
      },
      error=>{
        this.toaster.error('Error', 'Something Went Wrong');
      }
    )
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
