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
          console.log(this.filter)
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
    //this.employeForm.reset()
  }
}
