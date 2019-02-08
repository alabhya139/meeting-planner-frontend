import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { CreditComponent } from './credit/credit.component';
import { HomeComponent } from './home/home.component';
import { UserManagementService } from './services/user-management.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CreateEventComponent } from './create-event/create-event.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MeetingInfoComponent } from './meeting-info/meeting-info.component';
import { EditEventsComponent } from './edit-events/edit-events.component';
import { ForgotPasswordSendMailComponent } from './forgot-password-send-mail/forgot-password-send-mail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CreditComponent,
    HomeComponent,
    UserHomeComponent,
    CreateEventComponent,
    AdminHomeComponent,
    MeetingInfoComponent,
    EditEventsComponent,
    ForgotPasswordSendMailComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    UserManagementService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
