import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  id;
  product:Product;
  constructor(private route: ActivatedRoute,private productService: ProductService) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getProduct();
  }
  getProduct(): void{
    this.productService.getByIdProduct(this.id)
    .subscribe( product=>this.product=product
    )}
}
