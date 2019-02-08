import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../services/user-management.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  token
  response
  changePasswordForm: FormGroup
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router:Router) { }

  ngOnInit() {

    this.changePasswordForm = this.fb.group({
      password: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.passwordRegex)
      ])],
      rePassword: ['',Validators.compose([
        Validators.required,
      ])]
    })
    this.route.paramMap.subscribe(
      data => {
        this.token = data;
        this.token = this.token.params.token;
      }
    )
  }

  isMatch = (input1: FormControl, input2: FormControl) => {
    if (input1.value.password == input2.value.rePassword) {
      return true;
    } else return false;
  }

  changePassword = () => {
    let password = this.changePasswordForm.value.password;
    let rePassword = this.changePasswordForm.value.rePassword;

    if(password===rePassword){
      this.userService.changePassword(this.token, password)
      .subscribe(
        data => {
          this.response = data;
          if (this.response.status === 200) {
            this.toaster.success('Success', this.response.message);
            this.router.navigate(['home/login']);
          } else {
            this.toaster.error('Error', this.response.message);
          }
        },
        error => {
          this.toaster.error('Error', 'Something went wrong!');
        })
    }else{
      this.toaster.error('Error', 'Password did not match');
    }
  }

}
