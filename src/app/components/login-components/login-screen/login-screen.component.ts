import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],

})
export class LoginScreenComponent {
  constructor(private router: Router) {}
  hide = true;
  keyboardValue = false;
  @Input()  name: string = '';
  @Input()  password: string ='';
  @Input() alinanVeri: string = '';
  @Output() showVirtualKeyboard: EventEmitter<boolean> = new EventEmitter<boolean>();
searchedProduct="";

@ViewChild('nameID') nameID!: ElementRef;

@ViewChild('passwordID') passwordID!: ElementRef;


input1Value: string = '';
input2Value: string = '';
focusedInput: number = 0; // 0 represents no input focused, 1 for input 1, 2 for input 2

nameInputIsFocus=false;
passwordInputIsFocus=false;

focusStateFunction(event: number){
if(event=== 1){
  this.nameInputIsFocus=true;
  this.passwordInputIsFocus=false;
}
else if(event=== 2){
  this.nameInputIsFocus=false;
  this.passwordInputIsFocus=true;

}
}
showKeyboard() {
  this.showVirtualKeyboard.emit(!this.keyboardValue);
  this.keyboardValue=!this.keyboardValue;
  if(this.nameInputIsFocus===true)  {
    this.nameID.nativeElement.focus();
this.name=this.alinanVeri;

  }  
  else if(this.passwordInputIsFocus===true)  {
    this.passwordID.nativeElement.focus();
    this.password=this.alinanVeri;

  }


} 


passwordInputFocus(event: any) {
  this.password = this.alinanVeri
    }
  
    nameInputFocus(event: any) {
      this.name = this.alinanVeri
        }
      

handleInputFocusChange(inputNumber: number) {
  this.focusedInput = inputNumber;
}
handleInputFocus(inputNumber: number) {
  this.focusedInput = inputNumber;
}

handleInputBlur(inputNumber: number) {
  if (this.focusedInput === inputNumber) {
    this.focusedInput = 0;
  }
}


   loginFunction() {
    if(this.name == "admin" && this.password == "12345"){

      alert("Giriş Başarılı. Admin Sayfasına Yönlendiriliyorsunuz.");
      this.router.navigate(['/admin']);

    }
    else if(this.name == "user" && this.password == "12345"){
      alert("Giriş Başarılı. Üye Sayfasına Yönlendiriliyorsunuz.");
      this.router.navigate(['/']);

    }
    else{
      alert("Giriş Başarısız. Lütfen Tekrar Deneyiniz.");
    }


  }



}
