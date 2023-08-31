import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/services/localStorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isNavbarCollapsed=true;
  constructor(private cookieService: CookieService,private router: Router,private localStorageService: LocalStorageService) {}

  hasCustomerToken(): boolean {
    return this.cookieService.check('customerToken'); // 'customerToken' isimli çerezin varlığını kontrol ediyoruz
  }
  hasAdminToken(): boolean {
    return this.cookieService.check('adminToken'); // 'adminToken' isimli çerezin varlığını kontrol ediyoruz
  }

totalCartProduct:number=this.localStorageService.getCartItems('cart').length;





   deleteToken() {
    if(this.cookieService.check('customerToken')) {
      this.cookieService.delete('customerToken'); // 'authToken' adındaki çerezi siliyoruz
      this.cookieService.delete('userName'); 
      this.cookieService.delete('userId'); 
      this.localStorageService.clearCart('cart');


    }
    if(this.cookieService.check('adminToken')){
      this.cookieService.delete('adminToken'); // 'authToken' adındaki çerezi siliyoruz
      this.cookieService.delete('userName'); 
      this.cookieService.delete('userId'); 
    }

     this.router.navigate(['/']);

  }
}
