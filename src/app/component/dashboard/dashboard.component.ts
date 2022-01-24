import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,FormControl}from '@angular/forms'
import { Employee } from 'src/app/model/employee';
import { ApiService } from 'src/app/sha/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
empDetail!:FormGroup;

empObj:Employee=new Employee();
empList:any=[];
btnSaveShow:boolean=true;
btnUpdateShow:boolean=false;

  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    
    this.empDetail=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getEmployee();
  }

postEmployeeDetails(){
  this.empObj.firstName=this.empDetail.value.firstName;
  this.empObj.lastName=this.empDetail.value.firstName;
  this.empObj.email=this.empDetail.value.email;
  this.empObj.mobile=this.empDetail.value.mobile;

  this.empObj.salary=this.empDetail.value.salary;


this.api.postEmployee(this.empObj).subscribe({next:(v)=>{
  console.log(v)
},
error:(e) =>{
  console.log(e)
  alert("error")

  },
  complete:()=>{
    console.log('student record added')
    alert("student record added")
    this.getEmployee();
    this.empDetail.reset();
  }
}
)}
getEmployee(){
  this.api.getEmployee().subscribe(res =>{
    this.empList=res;
  })
}
deleteEmployee(data:any){
  this.api.deleteEmployee(data.id).subscribe({next:(v)=>{
    console.log(v)
  },
  error:(e)=>{
    console.log(e)
    alert("error")
  },
  complete:()=>{
    console.log('employee record deleted')
    alert("employee record deleted")
    this.getEmployee();
    this.empDetail.reset();

    
  }

    })
  }

  
editEmployee(data:any){
  this.empObj.id=data.id;
 this.empDetail.controls["firstName"].setValue(data.firstName);
 this.empDetail.controls["lastName"].setValue(data.lastName);
 this.empDetail.controls["email"].setValue(data.email);
 this.empDetail.controls["number"].setValue(data.number);
 this.empDetail.controls["salary"].setValue(data.salary);

 this.empObj.id=data.id;
 
    
  }
  updateEmployee(){
    this.empObj.firstName=this.empDetail.value.firstName;
    this.empObj.lastName=this.empDetail.value.lasttName;
    this.empObj.email=this.empDetail.value.email;
    this.empObj.mobile=this.empDetail.value.mobile;
  
    this.empObj.salary=this.empDetail.value.salary;

  
  
  this.api.putEmployee(this.empObj,this.empObj.id).subscribe(res=>{
    alert("updated successfully");
    let ref=document.getElementById('cancel')
    ref?.click();
    this.empDetail.reset();
    this.getEmployee();})}}
  
  

   




  















 






