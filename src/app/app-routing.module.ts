import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './sha/auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},

  {path:"login",component:LoginComponent},

  {path:"signup",component:SignupComponent},
  {path:"dashboard",component:DashboardComponent,
  canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
