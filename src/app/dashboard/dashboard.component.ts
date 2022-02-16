import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { ApiService } from 'src/app/sha/api.service';
import { AuthService } from 'src/app/sha/auth.service';
import { Project } from '../models/project';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projectForm!: FormGroup;
  employeForm!: FormGroup;
  constructor(private formbuilder: FormBuilder,private http:HttpClient, private data: DataService) { }

  ngOnInit(): void {
    this.employeForm = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
      password: [''],
      role: ['']
    })
    this.projectForm = this.formbuilder.group({
      name: [''],
      description: [''],
      status: [''],
      leader: [''],
      team: [[]],
      startDate: [''],
      endDate: ['']
    })
    this.getEmployes();
    this.getProjects()
  }
  today=new Date()
  employes:Employe[]=[]
  comingProject=0
  blockedProject=0
  retardProject=0
  doneProject=0
  projects:Project[]=[]
  username:any
  getProjects(){
    this.username=sessionStorage.getItem('user')
    this.http.get("http://localhost:3000/projects").subscribe((res:any)=>{
      res.forEach((element:Project) => {
        this.projects.push(element)
        if(element.status=="encours") this.comingProject++
        if(element.status=="blocked") this.blockedProject++
        if(element.status=="done") this.doneProject++
        if(element.status=="enretard") this.retardProject++
      });
    })
  }
  getEmployes(){
    this.http.get("http://localhost:3000/Users").subscribe((res:any)=>{
      res.forEach((element:Employe) => {
        if(element.role=="Employe") this.employes.push(element)
      });
    })
  }
  submitProject(){
    console.log(this.projectForm.value)
    this.http.post("http://localhost:3000/projects",this.projectForm.value).subscribe((res:any)=>{
    })
    this.projectForm.reset()
  }
  submitEmploye(){
    console.log(this.employeForm.value)
    this.http.post("http://localhost:3000/Users",this.employeForm.value).subscribe((res:any)=>{
    })
  }
  /*postEmployeeDetails() {
    this.employe.firstName = this.empDetail.value.firstName;
    this.employe.lastName = this.empDetail.value.firstName;
    this.employe.email = this.empDetail.value.email;
    this.employe.mobile = this.empDetail.value.mobile;
    this.employe.salary = this.empDetail.value.salary;
    this.employe.role = this.empDetail.value.role;
    this.api.postEmployee(this.employe).subscribe({
      next: (v) => {
      },
      error: (e) => {
        console.log(e)
        alert("error")
      },
      complete: () => {
        this.getEmployee();
        this.empDetail.reset();
      }
    }
    )
  }
  getEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employees = res;
    })
  }
  add(){
    this.empDetail.reset()
  }
  deleteEmployee(data: any) {
    this.api.deleteEmployee(data.id).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e)
        alert("error")
      },
      complete: () => {
        this.getEmployee();
        this.empDetail.reset();
      }
    })
  }


  editEmployee(data: Employe) {
    this.employe.id = data.id;
    this.empDetail.controls["firstName"].setValue(data.firstName);
    this.empDetail.controls["lastName"].setValue(data.lastName);
    this.empDetail.controls["email"].setValue(data.email);
    this.empDetail.controls["mobile"].setValue(data.mobile);
    this.empDetail.controls["salary"].setValue(data.salary);
    this.empDetail.controls["role"].setValue(data.role);
    this.employe.id = data.id;


  }
  updateEmployee() {
    this.employe.firstName = this.empDetail.value.firstName;
    this.employe.lastName = this.empDetail.value.lasttName;
    this.employe.email = this.empDetail.value.email;
    this.employe.mobile = this.empDetail.value.mobile;
    this.employe.role = this.empDetail.value.role;
    this.employe.salary = this.empDetail.value.salary;



    this.api.putEmployee(this.employe, this.employe.id).subscribe(res => {
      this.empDetail.reset();
      this.getEmployee();
    })
  }
  logout(){
    this.auth.isauth=false;
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }*/
}
