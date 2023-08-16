import { Component } from '@angular/core';
import { Model, TodoItems } from './model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'selam';


model = new Model();
getName(){
  return this.model.user;
}

getItems(){
  return this.model.items.filter(item => item.isVisible);
}

displayItems(){
  this.model.items.forEach(item => item.isVisible = true);}

addItem(value:any){
  if(value != ""){
    this.model.items.push(new TodoItems(value,false,true));
  }

}
}
