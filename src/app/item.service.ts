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
  public getCategoryByLabel(label: string) {
    const url = `${this.apiUrl + this.categoryEndpoint}?label=${label}`;
    return this.http.get(url);
  }
  public getCategoryByName(name: string) {
    const url = `${this.apiUrl + this.categoryEndpoint}?name=${name}`;
    return this.http.get(url);
  }
  public getItemsByCategory(category: string): Observable<any> {
    const url = `${this.apiUrl + this.itemsEndpoint}?categoryLabel=${category}`;
    return this.http.get(url);
  }
  public getItemsBySearchWord(word: string, category: string) {
    let url: string;
    let categoryName: string;
    const regexp = new RegExp('^[0-9]+'); // регулярка для проверки является ли первый символ числом
    category !== 'all' ? categoryName = `&categoryLabel=${category}` : categoryName = '';
    if (regexp.test(word)) {
      url = `${this.apiUrl + this.itemsEndpoint}?serNumber=${word}${categoryName}`;
    } else {
      url = `${this.apiUrl + this.itemsEndpoint}?name=${word}${categoryName}`;
    }
    return this.http.get(url);
  }
  public removeItem(id: number) {
    const url = `${this.apiUrl + this.itemsEndpoint}/${id}`;
    return this.http.delete(url);
  }
  public addItem(item: object) {
    const url = `${this.apiUrl + this.itemsEndpoint}`;
    return this.http.post(url, item);
  }
}
