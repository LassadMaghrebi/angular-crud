import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private Admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient,private router:Router) {
    if(sessionStorage.getItem('user')!=null){
      this.loggedIn.next(true);
    }
    if(sessionStorage.getItem('role')=="Admin"){
      this.Admin.next(true);
    }
  }
  signin(f:any){
    this.http.get<any>("http://localhost:3000/Users")
    .subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email==f.value.email && a.password==f.value.password
      }
      );
      if(user){
        
        sessionStorage.setItem("user",user.firstName)
        sessionStorage.setItem("userId",user.id)
        sessionStorage.setItem("role",user.role)
        this.loggedIn.next(true);
        if(user.role=="Admin"){
          this.Admin.next(true) 
          this.router.navigateByUrl('/dashboard')
        }else  this.router.navigateByUrl('/employeDashboard')
      }
      })

  }
  signup(f:any){

  }
  IsLoggedIn(){
    return this.loggedIn.asObservable();
  }
  IsAdmin(){
    return this.Admin.asObservable();
  }
  logOut(){
    this.loggedIn.next(false);
    this.Admin.next(false);
    sessionStorage.clear()
    this.router.navigateByUrl('/signin')
  }
}