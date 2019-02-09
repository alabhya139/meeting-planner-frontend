import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';

import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  userDetails: any
  url: String
  authToken: String

  constructor(
    private fb: FormBuilder,
    private service: UserManagementService,
    private cookie: CookieService,
    private router: Router,
    private toasterService: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  login() {
    this.service.loginFunction(this.loginForm.value).subscribe(
      (data => {
        this.userDetails = data;
        console.log(this.userDetails);
        
        if (this.userDetails.status === 200) {
          this.toasterService.success("Success", this.userDetails.message)
          localStorage.setItem('userInfo', JSON.stringify(this.userDetails.data.userDetails));
          localStorage.setItem('authToken',this.userDetails.data.authToken);
          localStorage.setItem('isAdmin',this.userDetails.data.userDetails.isAdmin);
          localStorage.setItem('userId',this.userDetails.data.userDetails.userId);
          localStorage.setItem('isLogged',"true");
          console.log(typeof localStorage.getItem('isAdmin'))
          localStorage.setItem('user-name',`${this.userDetails.data.userDetails.firstName} ${this.userDetails.data.userDetails.lastName}`);
          if(this.userDetails.data.userDetails.isAdmin==true){
            this.router.navigate([`/admin/${this.userDetails.data.userDetails.userId}`]);
          }else this.router.navigate([`/user/${this.userDetails.data.userDetails.userId}`]);
        }else {
          this.toasterService.error("Error", this.userDetails.message)
        }
      }),
      error=>{
        this.toasterService.error("Error", 'Some Error Occured')
      }
    )
  }

}
