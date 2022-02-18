import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { EmployesComponent } from './employes/employes.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './services/auth.guard';
import { AdminAuthGuard } from './services/admin.auth.guard';
import { EmployeDashboardComponent } from './employe-dashboard/employe-dashboard.component';


const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:"signin",component:SigninComponent},
  {path:"signup",component:SignupComponent},
  {path:"projects/:filter",canActivate:[AuthGuard],component:ProjectsComponent},
  {path:"projects",canActivate:[AuthGuard],component:ProjectsComponent},
  {path:"project/:id",canActivate:[AuthGuard],component:ProjectComponent},
  {path:"employes",canActivate:[AdminAuthGuard],component:EmployesComponent},
  {path:"employeDashboard",canActivate:[AuthGuard],component:EmployeDashboardComponent},
  {path:"dashboard",canActivate:[AdminAuthGuard],component:DashboardComponent/*,
canActivate:[AuthGuard]*/}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
