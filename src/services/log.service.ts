import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'https://localhost:7037/api/logs'; // API adresinizi buraya girin

  constructor(private http: HttpClient) { }

  // Tüm log kayıtlarını almak için API ile iletişim kurar
  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Belirli bir log kaydını almak için API ile iletişim kurar
  getLog(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Yeni log kaydı eklemek için API ile iletişim kurar
  addLog(log: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, log);
  }

  // Varolan log kaydını güncellemek için API ile iletişim kurar
  updateLog(id: number, log: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, log);
  }

  // Log kaydını silmek için API ile iletişim kurar
  deleteLog(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
