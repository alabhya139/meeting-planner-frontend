import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  meetingForm: FormGroup
  hour: string[] = []
  minute: string[]= []
  constructor(
    private fb: FormBuilder, 
    private cookie: CookieService,
    private route: ActivatedRoute) { }
  str:string
  inff:number

  ngOnInit() {
    for(let i=1;i<13;i++){
      if(i<10){
        this.hour.push("0"+i);
      }else this.hour.push(""+i);
    }

    for(let i=1;i<61;i++){
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
      startHour:[''],
      startMinute: [''],
      startTime: [''],
      endHour: [''],
      endMinute: [''],
      endTime: ['']
    });
  }

  createMeeting(){
    let formData = this.meetingForm.value;

    let startHour = this.changeToHour(formData.startHour,formData.startMinute,formData.startTime);
    let endHour = this.changeToHour(formData.endHour,formData.endMinute,formData.endTime);

    delete formData.startHour;
    delete formData.startMinute;
    delete formData.startTime;
    delete formData.endHour;
    delete formData.endMinute;
    delete formData.endTime;

    if(formData.endDate===""){
      delete formData.endDate
    }

    if(isNaN(startHour) && isNaN(endHour)){
      console.log("Not a number")
    }else {
      formData.startHour = startHour;
      formData.endHour = endHour;
    }

    formData.adminId = this.cookie.get('userId')

    console.log(formData)
    
  }

  changeToHour(hour,min,str):number{
    if(str==="AM"){
      return parseInt(hour)+(parseInt(min)/60);
    }else return parseInt(hour)+(parseInt(min)/60)+12;
  }

}
