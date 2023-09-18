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
  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private localStorageService: LocalStorageService,
    public translate: TranslateService
  ) {
    translate.addLangs(['tr', 'en']);
    translate.setDefaultLang('tr');
  }
  cartItems: any[] = [];

  isNavbarCollapsed = true;
  totalCartProduct: number = this.localStorageService.getCount('cart');

  ngOnInit(): void {
    if (this.cookieService.check('lang')) {
      if (this.cookieService.get('lang') === 'tr') {
        this.translate.use('tr');
      } else if (this.cookieService.get('lang') === 'en') {
        this.translate.use('en');
      }
    }
    this.localStorageService.getCartItemsObservable().subscribe((items) => {
      this.totalCartProduct = items.length;
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
    if (this.cookieService.check('lang')) {
      if (this.cookieService.get('lang') === 'tr') {
        this.cookieService.set('lang', 'en'); // userId'i çereze ekleyin
      } else if (this.cookieService.get('lang') === 'en') {
        this.cookieService.set('lang', 'tr'); // userId'i çereze ekleyin
      }
    }
  }
  deleteToken() {
    if (this.cookieService.check('customerToken')) {
      this.cookieService.delete('customerToken'); // 'authToken' adındaki çerezi siliyoruz
      this.cookieService.delete('userName');
      this.cookieService.delete('userId');
      this.localStorageService.clearCart('cart');
    }
    if (this.cookieService.check('adminToken')) {
      this.cookieService.delete('adminToken'); // 'authToken' adındaki çerezi siliyoruz
      this.cookieService.delete('userName');
      this.cookieService.delete('userId');
    }

    this.router.navigate(['/']);
  }
}
