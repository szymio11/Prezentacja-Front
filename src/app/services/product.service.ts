import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { ProductUpdate, Product } from '../model/product';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient,private config: AppConfig) { }
  
  addProduct (product: ProductUpdate): Observable<ProductUpdate> {
    return this.http.post<ProductUpdate>(this.config.apiUrl + 'product', product, httpOptions)
      .pipe(
      //  catchError(this.handleError('addProduct', product))
      );
  }
  getProducs (): Observable<Product[]> {
    return this.http.get<Product[]>(this.config.apiUrl+'product')
      .pipe(
   
           );
  }


}
