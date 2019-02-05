import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { UserManagementService } from 'src/app/services/user-management.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { countryCode } from '../../../app/country_code'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.httpResponse=null;
  }
  @Input() defaultCountry;

  signupForm: FormGroup
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  emailSent = false;
  httpResponse: any
  countryCode = countryCode;
  space = "       " ;

  constructor(
    private fb: FormBuilder, 
    private httpService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)
      ])],
      mobileNumber: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(15)
      ])],
      password:['',Validators.compose([
        Validators.minLength(6),
        Validators.pattern(this.passwordRegex),
        Validators.required
      ])],
      isAdmin: ['']
    });
  }

  signUp(){
    console.log(this.signupForm.value);

    if(this.signupForm.value.isAdmin=="" || this.signupForm.value===undefined || this.signupForm.value === null){
      this.signupForm.value.isAdmin = false;
    }
    this.httpService.signUpFunction(this.signupForm.value).subscribe(
      (data=>{
        this.httpResponse = data;
        if(data.status === 200){
          this.emailSent=true;
          this.toasterService.success('Success', 'Succefully Registered!');
        }else {
          this.toasterService.error('Error',this.httpResponse.message)
        }
      }),
      (error=>{
        console.log(error)
        this.toasterService.error('Error',"Some Error Occured")
      })
    )
  }

}
