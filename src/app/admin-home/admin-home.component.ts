import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  userCollection
  userNotAdmin: any[] = []

  constructor(private userService: UserManagementService, private toaster: ToastrService) { }

  ngOnInit() {
    this.userService.getAllUser()
      .subscribe(
        data=>{
          this.userCollection = data;
          this.userCollection = this.userCollection.data;
          
          for(let user of this.userCollection){
            if(user.isAdmin!==true){
              this.userNotAdmin.push(user)
            }
          }
          console.log(this.userCollection[0].userId)
        },
        (error)=>{
          this.toaster.error('Error','Something went wrong');
        }
      )
  }

}
