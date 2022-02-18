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
  projects:Project[]=[]
  comingProject=0
  blockedProject=0
  retardProject=0
  doneProject=0
  username:any
  visible=false
  teams:Employe[]=[]
  emps:any=[]
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
    let u:any=sessionStorage.getItem('userId')
    let userId=parseInt(u)
    this.teams.forEach(element => {
      this.projectForm.value.team.push(element.id)
    })
    let notification={
      from:userId,
      to:this.projectForm.value.team,
      type: "New Project",
      startDate: this.projectForm.value.startDate,
      endDate: this.projectForm.value.endDate,
      vue:false
    }
    this.http.post("http://localhost:3000/notifications",notification).subscribe(res=>{

    })
    this.projectForm.value.leader=parseInt(this.projectForm.value.leader)
    this.http.post("http://localhost:3000/projects",this.projectForm.value).subscribe((res:any)=>{
    })
    this.projectForm.reset()
  }
  submitEmploye(){
    this.http.post("http://localhost:3000/Users",this.employeForm.value).subscribe((res:any)=>{
    })
  }
  blure(){
    this.emps=[]
    this.visible=false
  }
  input(e:any){
    this.emps=[]
    this.employes.forEach(element => {
      if(element.firstName.search(e.target.value)!=-1){
        this.emps.push(element)
        this.visible=true
      }
    });
  }
  addChip(e:Employe){
    if(this.teams.indexOf(e)==-1||this.teams.length==0){
      this.visible=false
      this.teams.push(e)
    }
  }
  removeChip(e:Employe){
    this.teams.splice(this.teams.indexOf(e),1)
  }
}
