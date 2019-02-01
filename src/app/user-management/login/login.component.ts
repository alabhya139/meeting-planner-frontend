import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator} from '@angular/forms'
import { fbind } from 'q';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private service:UserManagementService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  login(){
    this.service.loginFunction(this.loginForm.value).subscribe(
      (data=>{
        console.log(data)
      })
    )
  }

}
