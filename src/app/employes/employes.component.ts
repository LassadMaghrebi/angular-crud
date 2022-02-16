import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employe } from '../models/employe';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  employeForm!: FormGroup;
  constructor(private http:HttpClient,private router:Router,private formbuilder: FormBuilder) { }
  employes:Employe[]=[]
  employe:any
  ngOnInit(): void {
    this.employeForm = this.formbuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
      password: [''],
      role: ['']
    })
    this.getEmployes()
  }
  getEmployes(){
    this.employes=[]
    this.http.get("http://localhost:3000/Users").subscribe((res:any)=>{
      res.forEach((element:Employe) => {
        this.employes.push(element)
      });
    })
  }
  click(p:number){
    this.router.navigateByUrl('/project/'+p)
  }
  updateEmploye(){
    this.employe=this.employeForm.value
    this.http.patch<any>("http://localhost:3000/Users/"+this.employeForm.value.id,this.employe).subscribe((res:any)=>{
      this.getEmployes()
    })
  this.employeForm.reset()  
  }
  delete(e:number){
    this.http.delete("http://localhost:3000/Users/"+e).subscribe((res:any)=>{
  })
  this.getEmployes()
  }
  reset(e:Employe){
    this.employeForm.setValue(e)
    // this.employeForm.controls["id"].setValue(e.id);
    // this.employeForm.controls["firstName"].setValue(e.firstName);
    // this.employeForm.controls["lastName"].setValue(e.lastName);
    // this.employeForm.controls["email"].setValue(e.email);
    // this.employeForm.controls["mobile"].setValue(e.mobile);
    // this.employeForm.controls["salary"].setValue(e.salary);
    // this.employeForm.controls["role"].setValue(e.role);
    //this.employeForm.reset()
  }
}
