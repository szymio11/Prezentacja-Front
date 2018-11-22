import { Category } from './../model/category';

import { AppConfig } from './../../app.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 categoryList: any[];
  constructor(private http: HttpClient, private config: AppConfig ) { }
  
  
  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.config.apiUrl+'category').pipe(
      tap(category => console.log('fetched categories')),
    );
  }

}

