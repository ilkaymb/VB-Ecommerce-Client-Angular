import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7037/Computers'; // Computer verilerinin alınacağı API URL'si

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: {
        'accept': '*/*'
      }
    });
  }
  getDataById(productId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`, {
      headers: {
        'accept': '*/*'
      }
    });
  }
  deleteDataById(productId:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`, {
      headers: {
        'accept': '*/*'
      }
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class EarPhoneService {
  private apiUrl = 'https://localhost:7037/EarPhones'; // EarPhone verilerinin alınacağı API URL'si

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: {
        'accept': '*/*'
      }
    });
  }
  getDataById(productId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`, {
      headers: {
        'accept': '*/*'
      }
    });
  }
  deleteDataById(productId:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`, {
      headers: {
        'accept': '*/*'
      }
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class ComputerCountService {
  private apiUrl = 'https://localhost:7037/Computers/count'; // Computer sayısının alınacağı API URL'si

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: {
        'accept': '*/*'
      }
    });
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7037/Auth'; // API adresinizi ve port numaranızı buraya ekleyin

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, {
      headers: {
        'accept': '*/*'
      }
    });
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user,);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'https://localhost:7037/Customer'; // API adresinizi ve port numaranızı buraya ekleyin

  constructor(private http: HttpClient) { }

  register(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`, {
      headers: {
        'accept': '*/*'
      }
    });
  }


}