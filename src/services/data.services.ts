import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  updateDataById(productId: any, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`; // Güncellenecek ürünün URL'sini oluşturun
  
    return this.http.put(url, updatedData, {
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
  updateDataById(productId: any, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`; // Güncellenecek ürünün URL'sini oluşturun
  
    return this.http.put(url, updatedData, {
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
 @Injectable({
  providedIn: 'root'
})
export class LikeService {
  private baseUrl = 'https://localhost:7037/Like'; // API adresinizi ve port numaranızı buraya ekleyin

  constructor(private http: HttpClient) { }

  addLike(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, body, {
      headers: {
        'accept': '*/*'
      }
    });
  }
  removeLike(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    return this.http.delete(`${this.baseUrl}/remove`, {
      headers,
      body: JSON.stringify(body) // Göndermek istediğiniz JSON verisini burada gövde olarak ekliyoruz.
    });
  }
  checkLike(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/check-like`, body, {
      headers: {
        'accept': '*/*'
      }
    });
    
  }
  getUserLikes(customer_id: any, category_id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-likes/${customer_id}/${category_id}`, {
      headers: {
        'accept': '*/*'
      }
    });
    
  }

}  
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'https://localhost:7037/Sales'; // Web API endpoint URL'si

  constructor(private http: HttpClient) { }

  addSales(products: any[]): Observable<any> {
    return this.http.post(this.apiUrl, products, { responseType: 'json' });
  }
  getSalesByCustomerAndProduct(customer_id: number,category_id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-purchased/${customer_id}/${category_id}`, {
      headers: {
        'accept': '*/*'
      }
    });
  }
}