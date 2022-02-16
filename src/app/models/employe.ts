export class Employe{
    id:number=0;
    firstName:String
    lastName:String
    email:String
    mobile:String
    salary:number
    role:String
    constructor(id:number,name:String,firstName:String,lastName:String,email:String,mobile:String,salary:number,role:String){
        this.id=id
        this.firstName=firstName
        this.lastName=lastName
        this.email=email
        this.mobile=mobile
        this.salary=salary
        this.role=role
    }

}