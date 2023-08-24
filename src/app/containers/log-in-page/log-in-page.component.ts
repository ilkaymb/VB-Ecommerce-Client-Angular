import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent {
  alinanVeri: string = '';
  virtual_keyboard_value:boolean | undefined;
  @Output() virtual_keyboard: EventEmitter<boolean> = new EventEmitter<boolean>();


  veriyiAl(veri: string) {
    this.alinanVeri = veri;

  }
  showVirtualKeyboard: boolean = false;

  toggleVirtualKeyboard(show: boolean) {
    this.showVirtualKeyboard = show;
  }
}
