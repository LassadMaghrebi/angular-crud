import { Employe } from "./employe";

export class Project{
    id:number=0;
    name:String
    description:String
    status:String
    leader:number
    team:Employe[]
    startDate:Date
    endDate:Date
    constructor(id:number,name:String,description:String,status:String,leader:number,team:Employe[],startDate:Date,endDate:Date){
        this.id=id
        this.name=name
        this.description=description
        this.status=status
        this.leader=leader
        this.team=team
        this.startDate=startDate
        this.endDate=endDate
    }
}