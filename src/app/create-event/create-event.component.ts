import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import { ToastrService } from 'ngx-toastr';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { SocketService } from '../services/socket.service';
import { UserManagementService } from '../services/user-management.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  meetingForm: FormGroup
  hour: string[] = []
  minute: string[]= []
  response: any;
  constructor(
    private fb: FormBuilder, 
    private cookie: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserManagementService,
    private meetingService: MeetingService,
    private toaster: ToastrService) { }
  str:string
  inff:number
  userId
  userEmail

  ngOnInit() {
    this.route.paramMap.subscribe(
      (data)=>{
        this.userId=data;
        this.userId =  this.userId.params.userId;
      }
    );
    for(let i=1;i<13;i++){
      if(i<10){
        this.hour.push("0"+i);
      }else this.hour.push(""+i);
    }

    for(let i=0;i<60;i++){
      if(i<10){
        this.minute.push("0"+i);
      }else this.minute.push(""+i);
    }

    this.meetingForm = this.fb.group({
      meetingTitle: ['',Validators.compose([
        Validators.required
      ])],
      meetingPlace: ['', Validators.required],
      meetingDescription: ['',Validators.required],
      startDate: [''],
      endDate: [''],
      startHour: [''],
      endHour: [''],
      s_Hour:[''],
      startMinute: [''],
      startTime: [''],
      e_Hour: [''],
      endMinute: [''],
      endTime: ['']
    });
  }

  createMeeting(){
    let formData = this.meetingForm.value;

    let startHour = this.changeToHour(formData.s_Hour,formData.startMinute,formData.startTime);
    let endHour = this.changeToHour(formData.e_Hour,formData.endMinute,formData.endTime);

    if(formData.endDate===""){
      delete formData.endDate
    }

    if(isNaN(startHour) && isNaN(endHour)){
      console.log("Not a number")
    }else {
      formData.startHour = startHour;
      formData.endHour = endHour;
    }

    formData.adminId = localStorage.getItem('userId');
    formData.userId = this.userId;

    console.log(formData)

    
    this.meetingService.createMeetings(formData)
      .subscribe(
        data=>{
          this.response = data;
          if(this.response.status===200){
            this.toaster.success('Success',this.response.message);
            this.router.navigate([`/user/${this.userId}`]);
          }else {
            this.toaster.error('Error',this.response.message);
          }
        },
        error=>{
          this.toaster.error('Error','Something went wrong!');
        })
  }

  changeToHour(hour,min,str):number{
    if(str==="AM"){
      if(parseInt(hour)===12){
        return 0+(parseInt(min)/60);
      }else return parseInt(hour)+(parseInt(min)/60);
    }else return parseInt(hour)+(parseInt(min)/60)+12;
  }

}
