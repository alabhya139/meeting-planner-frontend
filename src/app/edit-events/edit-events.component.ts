import { Component, OnInit, OnChanges, DoCheck, ChangeDetectorRef, ChangeDetectionStrategy, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from '../services/meeting.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEventsComponent implements OnInit,DoCheck {

  meetingForm: FormGroup
  meetingId: any
  meeting
  hour: any[]=[];
  minute: any[]=[];
  view=0
  userId
  isAdmin = localStorage.getItem('isAdmin');

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService,
    private toaster: ToastrService,
    private cd: ChangeDetectorRef
  ) { }



  ngDoCheck(){
    this.cd.markForCheck()
    if(this.meeting!==undefined && this.view===0){
      console.log(this.meeting && this.view===0)
      this.userId=this.meeting.data.userId;
      this.meetingForm = this.fb.group({
        meetingTitle: [this.meeting.data.meetingTitle],
        meetingPlace: [this.meeting.data.meetingPlace],
        meetingDescription: [this.meeting.data.meetingDescription],
        startDate: [this.meeting.data.startDate],
        endDate: [this.meeting.data.endDate],
        startHour: [this.meeting.data.startHour],
        endHour: [this.meeting.data.endHour],
        s_Hour:[this.meeting.data.s_hour],
        startMinute: [this.meeting.data.s_min],
        startTime: [this.meeting.data.s_time],
        e_Hour: [this.meeting.data.e_hour],
        endMinute: [this.meeting.data.e_min],
        endTime: [this.meeting.data.e_time]
      });
      this.view+=1

    }

  }

  ngOnInit() {
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
    
    this.route.paramMap.subscribe(
      data=>{
        this.meetingId = data;
        this.meetingId = this.meetingId.params.meetingId;
      }
    );

    
    this.meetingService.getMeetingById(this.meetingId)
      .subscribe(
        data=>{
         this.meeting = data;
        }
      );
  }

  editMeeting(){
    let formValue = this.meetingForm.value;

    formValue.startHour=this.changeToHour(formValue.s_Hour,formValue.startMinute,formValue.startTime);
    formValue.endHour=this.changeToHour(formValue.e_Hour,formValue.endMinute,formValue.endTime);
    formValue.adminId = localStorage.getItem('userId');
    formValue.userId = this.userId;
    console.log(formValue)

    this.meetingService.editMeetings(this.meetingId,formValue)
      .subscribe(
        data=>{
          if(data.status===200){
            this.toaster.success('Success',data.message);
            this.router.navigate([`/user/${data.data.userId}`]);
          }else{
            this.toaster.error('Error',data.message);
          }
        },
        error=>{
          this.toaster.error('Error','Some Error Occured!');
        }
      );
  }

  changeToHour(hour,min,str):number{
    if(str==="AM"){
      if(parseInt(hour)===12){
        return 0+(parseInt(min)/60);
      }else return parseInt(hour)+(parseInt(min)/60);
    }else return parseInt(hour)+(parseInt(min)/60)+12;
  }

  deleteMeeting(){
    this.meetingService.deleteMeeting(this.meetingId)
      .subscribe(
        data=>{
          if(data.status===200){
            this.toaster.success('Success',data.message);
            this.router.navigate([`/user/${data.data.userId}`]);
          }else{
            this.toaster.error('Error',data.message);
          }
        },
        error=>{
          this.toaster.error('Error','Some Error Occured!');
        }
      )
  }


}
