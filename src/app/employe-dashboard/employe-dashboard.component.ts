import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit {
  DemandeForm!: FormGroup;
  constructor(private formbuilder: FormBuilder,private http:HttpClient) { }
  today=new Date()
  admins:any=[]
  ngOnInit(): void {
    this.DemandeForm = this.formbuilder.group({
      from: [''],
      to: [''],
      type: ['demande de conge'],
      cause: [''],
      startDate: [''],
      endDate: [''],
      vue: [false],
      accept: [false],

    })
    this.getAdmin()
  }
  getAdmin(){
    this.http.get<any>("http://localhost:3000/users").subscribe((res:any)=>{
      res.forEach((element:any) => {
        if(element.role=="Admin")this.admins.push(element.id)
        console.log(this.admins)
      });
    })
  }
  submitDemande(){
    this.DemandeForm.controls["from"].setValue(sessionStorage.getItem('userId'));
    this.DemandeForm.controls["to"].setValue(this.admins);
    this.http.post("http://localhost:3000/notifications",this.DemandeForm.value).subscribe((res:any)=>{
    })
    this.DemandeForm.reset()
  }

}
