import { Category } from './../model/category';

import { AppConfig } from './../../app.config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 categoryList: any[];
  constructor(private http: Http, private apiUrl: AppConfig ) { }
  
  
  getCategory(){
  //  return this.http.get(this.apiUrl+"recipe");
    // this.http.get(this.apiUrl+"recipe").pipe(map((data : any[]) => {
  //    return data as any[];
  }

}

