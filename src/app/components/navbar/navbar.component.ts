import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/services/localStorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private cookieService: CookieService,private router: Router,private localStorageService: LocalStorageService,    public translate: TranslateService
    ) {translate.addLangs(['tr','en' ]);
  translate.setDefaultLang('tr');}
  cartItems: any[] = [];

  isNavbarCollapsed=true;
  totalCartProduct:number=this.localStorageService.getCount('cart');

  ngOnInit(): void {
    this.localStorageService.getCartItemsObservable().subscribe((items) => {
      this.totalCartProduct=items.length;
    });
  }
  hasCustomerToken(): boolean {
    return this.cookieService.check('customerToken'); // 'customerToken' isimli çerezin varlığını kontrol ediyoruz
  }
  hasAdminToken(): boolean {
    return this.cookieService.check('adminToken'); // 'adminToken' isimli çerezin varlığını kontrol ediyoruz
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
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
