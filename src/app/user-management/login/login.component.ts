import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';

import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';


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
          localStorage.setItem('userInfo', JSON.stringify(this.userDetails.data.userDetails))
          this.cookie.set("authToken", this.userDetails.data.authToken);
          this.cookie.set("userId", this.userDetails.data.userDetails.userId);
          this.cookie.set("user-name", `${this.userDetails.data.userDetails.firstName} ${this.userDetails.data.userDetails.lastName}`);
          console.log(this.userDetails.data.userDetails.lastName);
          this.cookie.set('isAdmin',this.userDetails.data.userDetails.isAdmin)
          this.router.navigate([`user/${this.userDetails.data.userDetails.userId}`]);
        }
      })
    )
  }

}
