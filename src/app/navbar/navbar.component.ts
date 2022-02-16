import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthentificationService,private http:HttpClient) {
    auth.IsLoggedIn().subscribe(res=>{
      this.isAuth=res
      console.log(res)
    })
    auth.IsAdmin().subscribe(res=>{
      this.isAdmin=res
    })
  }
  isAuth: boolean=false
  isAdmin:boolean=false
  notifications:any=[]
  notificationsNumber=0
  ngOnInit(): void {
    //this.isAdmin=sessionStorage.getItem('role')=="Admin"
    //console.log(this.isAdmin)
    this.getNotification()
  }
  getNotification(){
    this.notifications=[]
    if(this.isAuth){
      let u:any=sessionStorage.getItem('userId')
      let userId=parseInt(u)
      this.http.get<any>("http://localhost:3000/notifications").subscribe(res=>{
        this.notifications=[]
        this.notificationsNumber=0
        res.forEach((element:any) => {
          if(element.to.indexOf(userId)!=-1&& !element.vue) this.notificationsNumber++
          if(element.to.indexOf(userId)!=-1)this.notifications.push(element)
          console.log(element.to.indexOf(userId)!=-1)
        });
      })
    }
  }
  vue(){
    this.notifications.forEach((element:any) => {
      this.notificationsNumber=0
      if(element.type=="demande de conge"&& element.accept==null){
        element.vue=false
        this.http.patch<any>("http://localhost:3000/notifications/"+element.id,element).subscribe((res:any)=>{
        })
      }else{
        element.vue=true
        this.http.patch<any>("http://localhost:3000/notifications/"+element.id,element).subscribe((res:any)=>{
        })
      }
    })
  }
  accept(n:any){
    n.accept=true
    this.http.patch<any>("http://localhost:3000/notifications/"+n.id,n).subscribe((res:any)=>{
    })
    this.vue()
  }
  refuse(n:any){
    n.accept=false
    this.http.patch<any>("http://localhost:3000/notifications/"+n.id,n).subscribe((res:any)=>{
    })
  }
  deconnection(){
    this.auth.logOut()
  }
}
