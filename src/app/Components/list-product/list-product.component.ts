import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ToastrService } from 'ngx-toastr';
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
.subscribe( products=>{this.products=products},
 (error: Response) =>{
   if(error.status===404){
    this.toastr.error('Nie ma żadnych produktów w bazie!');
   }
   else{
    this.toastr.error('Wystąpił nie oczekiwany błąd!');
   }
 }
)

}
delete(product: Product){
  if(!confirm('Jesteś pewny, że chcesz usunąć ten produkt?'))return;

  this.productService.delete(product.id).subscribe(resp=>
  {
    this.getProducts();
    
  },
 (error: Response) =>{
   if(error.status===404){
    this.toastr.error('Ten produkt został już usunięty!');
   }
   else{
    this.toastr.error('Wystąpił nie oczekiwany błąd!');
   }
 }
);
  this.toastr.success('Produkt został usunięty!')
 
}
}
