import { HttpClient } from '@angular/common/http';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
getProducts(): void{
this.productService.getProducs()
.subscribe( products=>this.products=products
)

}
}
