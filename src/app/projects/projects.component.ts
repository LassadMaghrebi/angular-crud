import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from '../models/employe';
import { Project } from '../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  filter:any
  constructor(private formbuilder: FormBuilder,private http:HttpClient,private router:Router,private route:ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.filter=params.get('filter')
    })
  }
  projects:Project[]=[]
  employes:Employe[]=[]
  project:any
  projectForm!: FormGroup;
  visible=false
  teams:Employe[]=[]
  emps:any=[]
  ngOnInit(): void {
    this.projectForm = this.formbuilder.group({
      id: [''],
      name: [''],
      description: [''],
      status: [''],
      leader: [''],
      team: [[]],
      startDate: [''],
      endDate: ['']
    })
    this.getProjects()
    this.getEmployes()
  }
  getEmployes(){
    this.http.get("http://localhost:3000/Users").subscribe((res:any)=>{
      res.forEach((element:Employe) => {
        if(element.role=="Employe") this.employes.push(element)
      });
    })
  }
  getProjects(){
    this.projects=[]
    this.http.get("http://localhost:3000/projects").subscribe((res:any)=>{
      res.forEach((element:Project) => {
        if(this.filter!=null){
          if(element.status==this.filter)this.projects.push(element)
        }else{
          this.projects.push(element)
        }
        
      });
    })
  }
  click(p:number){
    this.router.navigateByUrl('/project/'+p)
  }
  getnbrDays(p:Project){
    let d3=new Date().getTime()
    let d2=new Date(p.endDate).getTime()

    let Days=Math.ceil((d2-d3)/(1000 * 3600 * 24))
    return  Days
  }
  updateProject(){
    this.projectForm.value.team=[]
    this.teams.forEach(element => {
      this.projectForm.value.team.push(element.id)
    })
    this.projectForm.value.leader=parseInt(this.projectForm.value.leader)
    this.project= this.projectForm.value;
    this.http.patch<any>("http://localhost:3000/projects/"+this.projectForm.value.id,this.project).subscribe((res:any)=>{
      this.getProjects()
  })
  this.projectForm.reset()
  }
  delete(e:number){
    this.http.delete("http://localhost:3000/projects/"+e).subscribe((res:any)=>{
  })
  this.getProjects()
  }
  reset(e:Project){
    this.projectForm.setValue(e)
    this.teams=[]
    e.team.forEach((element:any) => {
      this.employes.forEach(emp => {
        if(emp.id==element) this.teams.push(emp)
      });
    });
    //this.employeForm.reset()
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
  addChip(e:any){
    if(this.teams.indexOf(e)==-1||this.teams.length==0){
      this.visible=false
      this.teams.push(e)
    }
  }
  removeChip(e:Employe){
    this.teams.splice(this.teams.indexOf(e),1)
  }
  blure(){
    this.emps=[]
    this.visible=false
  }
  getName(t:any){
    let a=""
    this.employes.forEach((element:any) => {
      if(element.id==t) a=element.firstName
    })
  return a
  }
}
