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
    const url = `${this.apiUrl + this.itemsEndpoint}?categoryLabel=${category}`;
    return this.http.get(url);
  }
  public getItemsBySearchWord(word: any, category: string) {
    let url: string;
    let categoryName: string;
    const regexp = new RegExp('^[0-9]+'); // регулярка для проверки является ли первый символ числом
    if (typeof category !== 'undefined' && category !== 'all') {
      categoryName = `&categoryLabel=${category}`;
    } else {
      categoryName = '';
    }
    if (regexp.test(word)) {
      url = `${this.apiUrl + this.itemsEndpoint}?serNumber=${word}${categoryName}`;
    } else {
      url = `${this.apiUrl + this.itemsEndpoint}?name=${word}${categoryName}`;
    }
    return this.http.get(url);
  }
}
