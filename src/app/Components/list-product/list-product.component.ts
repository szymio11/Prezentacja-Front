import { HttpClient } from '@angular/common/http';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';


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
delete(product: Product){
  if(!confirm('Jesteś pewny, że chcesz usunąć ten przepis?'))return;

  this.productService.delete(product.id).subscribe();
}
}
