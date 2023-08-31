import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/data.services';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css'],


})
export class RegisterScreenComponent {
  constructor(private router: Router,private authService:AuthService) {}

  hide = true;
  name: string = '';
  password: number | undefined;
  passwordRepeat: number | undefined;
  
  registerFunction() {
    if (this.password !== this.passwordRepeat) {
      alert("Şifreler Uyuşmuyor. Lütfen Tekrar Deneyiniz.");
    } 
    if(this.password === this.passwordRepeat){
      // Veri girişi ve hata kontrolü
      const userData = {
        username: this.name,
        password: this.password,
        roleId: 0
      };
  
      this.authService.register(userData).subscribe(
        (res) => {
          // Başarılı kayıt işlemi
          console.log(res);
          if (res.message="Kullanıcı başarıyla oluşturuldu") {
            alert("Kayıt Başarılı. Giriş Sayfasına Yönlendiriliyorsunuz.");
            this.router.navigate(['/giris']);
          } 
        },
        (err) => {
          // Kayıt hatası
          console.error(err);
          alert("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."+err.message);
        }
      );   
    }
  }
}
