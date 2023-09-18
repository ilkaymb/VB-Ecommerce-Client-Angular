import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicDataService {
    private apiUrl = 'https://localhost:7037/DynamicData'; // EarPhone verilerinin alınacağı API URL'si

    constructor(private http: HttpClient) { }
    getAllData(tableName:any): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetData/${tableName}`, {
          headers: {
            'accept': '*/*'
          }
        });
      }

      getSingleData(tableName:any,productId:any): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetData/${tableName}/${productId}`, {
          headers: {
            'accept': '*/*'
          }
        });
      }
      getTableColumns(tableName:any): Observable<any> {
        return this.http.get(`${this.apiUrl}/Getcolumns/${tableName}`, {
          headers: {
            'accept': '*/*'
          }
        });
      }
      addData(tableName:any,body:any): Observable<any> {
        return this.http.post(`${this.apiUrl}/AddData/${tableName}`, body, {
          headers: {
            'accept': '*/*'
          }
        });
      }
      deleteData(tableName:any,productId:any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/DeleteData/${tableName}/${productId}`, {
          headers: {
            'accept': '*/*'
          }
        });
      }
      updateData(tableName:any,productId:any,body:any): Observable<any> {
        return this.http.put(`${this.apiUrl}/UpdateData/${tableName}/${productId}`, body,{
          headers: {
            'accept': '*/*'
          }
        });
      }
}