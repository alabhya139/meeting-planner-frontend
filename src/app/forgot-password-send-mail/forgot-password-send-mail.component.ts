import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../services/user-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password-send-mail',
  templateUrl: './forgot-password-send-mail.component.html',
  styleUrls: ['./forgot-password-send-mail.component.css']
})
export class ForgotPasswordSendMailComponent implements OnInit {

  emailForm: FormGroup
  response
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(private fb: FormBuilder,private userService: UserManagementService, private toaster: ToastrService) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)
      ])]
    });
  }

  sendMail(){
    this.userService.sendEmail(this.emailForm.value.email)
      .subscribe(data=>{
        this.response = data;
        if(this.response.status===200){
          this.toaster.success('Success',this.response.message);
        }else {
          this.toaster.error('Error',this.response.message);
        }
      },
      error=>{
        this.toaster.error('Error','Something went wrong!');
      })
  }

}
