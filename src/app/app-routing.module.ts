import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditComponent } from './credit/credit.component';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MeetingRouteGuardService } from './services/meeting-route-guard.service';
import { UserManagementRouteGuardService } from './services/user-management-route-guard.service';
import { EditEventsComponent } from './edit-events/edit-events.component';
import { ForgotPasswordSendMailComponent } from './forgot-password-send-mail/forgot-password-send-mail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'credits', component: CreditComponent },
  {path:'home',component:HomeComponent,canActivate:[UserManagementRouteGuardService],children:[
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    {path:'forgot-password',component:ForgotPasswordSendMailComponent},
    {path:'forgot-password-verify-user/:token',component:ChangePasswordComponent}
  ]},
  {path: 'user/:userId', component: UserHomeComponent, canActivate:[MeetingRouteGuardService]},
  {path:'create-meeting/:userId', component:CreateEventComponent, canActivate:[MeetingRouteGuardService]},
  {path:'admin/:adminId',component:AdminHomeComponent, canActivate:[MeetingRouteGuardService]},
  {path:'edit-meetings/:meetingId',component:EditEventsComponent, canActivate:[MeetingRouteGuardService]},
  {path:'',redirectTo:`home`,pathMatch:'full',canActivate:[UserManagementRouteGuardService]},
  {path:'*',redirectTo:`home`,pathMatch:'full',canActivate:[UserManagementRouteGuardService]},
  {path:'*',redirectTo:`home`,pathMatch:'full',canActivate:[UserManagementRouteGuardService]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MeetingRouteGuardService,UserManagementRouteGuardService]
})
export class AppRoutingModule { }
