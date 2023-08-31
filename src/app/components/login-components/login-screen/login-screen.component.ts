import { Component, ElementRef, EventEmitter, Input, Output, ViewChild,Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from 'src/services/data.services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],

})
export class LoginScreenComponent {
  hide = true;
  keyboardValue = false;
  @Input()  name: string = '';
  @Input()  password: string ='';
  @Input() alinanVeri: string = '';
  @Output() showVirtualKeyboard: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() getElementInput: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();


searchedProduct="";

@ViewChild('nameID') nameID!: ElementRef;

@ViewChild('passwordID') passwordID!: ElementRef;


input1Value: string = '';
input2Value: string = '';
focusedInput: number = 0; // 0 represents no input focused, 1 for input 1, 2 for input 2

  LoginUsers: any;


showKeyboard() {
  this.showVirtualKeyboard.emit(!this.keyboardValue);
  this.keyboardValue=!this.keyboardValue;
} 


handleInputBlur(inputNumber: number) {
  if (this.focusedInput === inputNumber) {
    this.focusedInput = 0;
  }
}


  constructor(private router: Router,private authService: AuthService,private renderer: Renderer2,private cookieService: CookieService) {}


  @ViewChild('myInput1') myInput1!: ElementRef;
  @ViewChild('myInput2') myInput2!: ElementRef;
 
  onInputFocus(input: HTMLInputElement) {
    input.value = input.value+ this.alinanVeri;
    this.getElementInput.emit(input);

    console.log(`Input ${input.id} focused`);
  }

  onInputBlur(input: HTMLInputElement) {
    console.log(`Input ${input.id} blurred`);

  }
  
  onChangeFunction(input: HTMLInputElement) {

    input.value = input.value+ this.alinanVeri;

  }
user:any={username:"",password:"",roleId:0};

   loginFunction() {
    this.authService.login({
      username: this.name,
      password: this.password,
      roleId: 0
    })
    .subscribe(
      (res: any) => {
        console.log(res);
        if(res.userLoginResponse.roleId==1){
          alert("Giriş Başarılı. Üye Sayfasına Yönlendiriliyorsunuz.");
          this.cookieService.set('customerToken', res.token);
          this.cookieService.set('userId', res.userLoginResponse.id); // userId'i çereze ekleyin
          this.cookieService.set('userName', this.name); // userName'i çereze ekleyin

          this.router.navigate(['/üye-sayfasi']);

        }
        else if(res.userLoginResponse.roleId==2){
          alert("Giriş Başarılı. Admin Sayfasına Yönlendiriliyorsunuz.");
          this.cookieService.set('adminToken', res.token);
          this.cookieService.set('userId', res.userLoginResponse.id); // userId'i çereze ekleyin
          this.cookieService.set('userName', this.name); // userName'i çereze ekleyin
          this.router.navigate(['/admin']);
        }
      },
      (err: any) => {
        console.log("Hatalı Giriş");
      },
    );
  }
  




  }



