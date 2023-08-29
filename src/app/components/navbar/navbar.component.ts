import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isNavbarCollapsed=true;
  constructor(private cookieService: CookieService,private router: Router) {}

  hasToken(): boolean {
    return this.cookieService.check('authToken'); // 'authToken' isimli çerezin varlığını kontrol ediyoruz
  }

   deleteToken() {
     this.cookieService.delete('authToken'); // 'authToken' adındaki çerezi siliyoruz
     this.router.navigate(['/']);

  }
}
