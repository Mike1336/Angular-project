import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor( private http: HttpClient) { }

  private apiUrl = 'api/';
  private itemsEndpoint = 'items';
  private categoryEndpoint = 'itemCategories';

  public getItems(): Observable<any> {
    return this.http.get(this.apiUrl + this.itemsEndpoint);
  }
  public getItemById(id: number): Observable<any> {
    const url = `${this.apiUrl + this.itemsEndpoint}/${id}`;
    return this.http.get(url);
  }
  public getCategories() {
    return this.http.get(this.apiUrl + this.categoryEndpoint);
  }
  public getItemsByCategory(category: string): Observable<any> {
    const url = `${this.apiUrl + this.itemsEndpoint}/?categoryLabel=${category}`;
    return this.http.get(url);
  }
}
