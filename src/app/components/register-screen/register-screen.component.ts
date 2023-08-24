import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css'],


})
export class RegisterScreenComponent {
  hide = true;
  constructor(private router: Router) {}

  name: string = '';
  password: number | undefined;
  passwordRepeat: number | undefined;

  loginFunction() {
if(this.password != this.passwordRepeat){

  alert("Şifreler Uyuşmuyor. Lütfen Tekrar Deneyiniz.");

}
else{
  alert("Kayıt Başarılı. Giriş Sayfasına Yönlendiriliyorsunuz.");
  this.router.navigate(['/login']);
}



  }
}
