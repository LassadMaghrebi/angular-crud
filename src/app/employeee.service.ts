import { Injectable } from '@angular/core';
import{HttpClient,HttpClientModule} from '@angular/common/http';
import { Employee } from './model/employee';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeeService {
  addEmpURL:string;
  getEmpURL:string;

  constructor(private http:HttpClient) { 

    this.addEmpURL='http://localhost:9091/emp/postEmployeeDetails';
    this.getEmpURL='http://localhost:9091/emp/getAll';

  }
  postEmployeeDetails(emp:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.addEmpURL,emp);
  }
  getAllEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.getEmpURL);

  }
}
