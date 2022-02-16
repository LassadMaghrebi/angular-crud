import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isauth:boolean=false;
  constructor( private http:HttpClient) {
    this.isauth=sessionStorage.getItem('user')!=''
    
  }
  IsLoggedIn(){
    
    return this.isauth;
  }
}
