import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor( private http: HttpClient) { }

  private apiUrl = 'api/';
  private empsEndpoint = 'emps';

  public getStaff(): Observable<any> {
    return this.http.get(this.apiUrl + this.empsEndpoint);
  }
  public getEmpById(id: number): Observable<any> {
    const url = `${this.apiUrl + this.empsEndpoint}/${id}`;
    return this.http.get(url);
  }
}
