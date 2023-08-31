import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class Deneme {
  constructor(private jwtHelper: JwtHelperService) { }

  public getUserRole(): string | null {
    const token:any = localStorage.getItem('access_token'); // Token'ı buradan alın veya istediğiniz yerden alabilirsiniz
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken['role'] : null;
  }
}