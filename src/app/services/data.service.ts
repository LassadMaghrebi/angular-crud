import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../models/employe';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }
  getNotifications(n:any){
    this.http.get<any>("http://localhost:3000/Notifications").subscribe(res=>{
      const Notification=res.find((a:any)=>{
        return a.to==n 
      })
    })
  }
  getEmployes(){
    return this.http.get("http://localhost:3000/Users")
  }

}
