import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditComponent } from './credit/credit.component';
import { LoginComponent } from './user-management/login/login.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  { path: 'credits', component: CreditComponent },
  {path:'home',component:HomeComponent,children:[
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent}
  ]},
  {path: 'user', component: UserHomeComponent},
  {path:'', redirectTo:'/home/login', pathMatch:"full"},
  {path:'*',redirectTo:'/home/login',pathMatch:'full'},
  {path:'**',redirectTo:'/home/login',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
