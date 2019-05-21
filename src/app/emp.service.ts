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
  private depEndpoint = 'departments';

  public getStaff(): Observable<any> {
    return this.http.get(this.apiUrl + this.empsEndpoint);
  }
  public getEmpById(id: number): Observable<any> {
    const url = `${this.apiUrl + this.empsEndpoint}/${id}`;
    return this.http.get(url);
  }
  public getDepartments() {
    return this.http.get(this.apiUrl + this.depEndpoint);
  }
  public getEmpsByDep(department: string): Observable<any> {
    const url = `${this.apiUrl + this.empsEndpoint}/?depLabel=${department}`;
    return this.http.get(url);
  }

}
