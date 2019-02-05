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

const routes: Routes = [
  { path: 'credits', component: CreditComponent },
  {path:'home',component:HomeComponent,children:[
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent}
  ]},
  {path: 'user/:userId', component: UserHomeComponent, canActivate:[MeetingRouteGuardService]},
  {path:'create-meeting/:userId', component:CreateEventComponent, canActivate:[MeetingRouteGuardService]},
  {path:'admin/:adminId',component:AdminHomeComponent, canActivate:[MeetingRouteGuardService]},
  {path:'', redirectTo:'/home/login', pathMatch:"full"},
  {path:'*',redirectTo:'/home/login',pathMatch:'full'},
  {path:'**',redirectTo:'/home/login',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MeetingRouteGuardService]
})
export class AppRoutingModule { }
