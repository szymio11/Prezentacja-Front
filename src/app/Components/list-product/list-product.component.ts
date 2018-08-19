import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ToastrService } from 'ngx-toastr';
import { TruncateModule } from '@yellowspot/ng-truncate';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
products: Product[];

  constructor(private toastr: ToastrService,private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
 
  }
getProducts(): void{
this.productService.getProducs()
.subscribe( products=>this.products=products
)

}
delete(product: Product){
  if(!confirm('Jesteś pewny, że chcesz usunąć ten produkt?'))return;

  this.productService.delete(product.id).subscribe(resp=>
  {
    this.getProducts();
    
  });
  this.toastr.success('Produkt został usunięty!')
 
}
}
