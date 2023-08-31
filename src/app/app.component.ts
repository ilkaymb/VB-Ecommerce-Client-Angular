import { Component } from '@angular/core';
import { Model, TodoItems } from './model';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');
  }
model = new Model();
getName(){
  return this.model.user;
}
switchLang(lang: string) {
  this.translate.use(lang);
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
