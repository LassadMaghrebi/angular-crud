import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'empolyee';
  selectedMenu:any='Home';
  isAuth=false
   constructor(){
    this.isAuth=sessionStorage.getItem('user')!=null
   }
  goTo(paramText:string){
    this.selectedMenu=paramText
  }
}
