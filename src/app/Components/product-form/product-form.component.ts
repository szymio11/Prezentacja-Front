import { ProductUpdate, Product } from './../../model/product';
import { Category } from './../../model/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {  Validators  } from '@angular/forms';
import {  FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
}) 

export class ProductFormComponent implements OnInit {
  product: ProductUpdate;
  categories: Category[];
  form;
  id;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,private categoryService: CategoryService, private productService: ProductService) { 
   this.form = fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      categoryId:['',Validators.required],
      price:[]
    })
    this.id = this.route.snapshot.paramMap.get('id');
  if(this.id) {
      this.productService.getByIdProduct(this.id).pipe(take(1)).subscribe(resp=> this.fillUpform(resp))
    }
  }

  ngOnInit() {
   
    this.getCategories();
  }
  setCategory():boolean{
    if(this.id){
      return true;
    }
    else{
      return false;
    }
  }
  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }
 get name(){
  return this.form.get('name');
}
get description(){
  return this.form.get('description');
}
get category(){
  return this.form.get('categoryId');
}
fillUpform(entity: Product){
  this.form.get('name').setValue(entity.name);
  this.form.get('description').setValue(entity.description);
  this.form.get('categoryId').setValue(entity.category.id);
  this.form.get('price').setValue(entity.price);
  
}
//Save product
saveProduct(){

  if(this.id) this.productService.updateProduct(this.id,this.form.value).subscribe(resp=>{
    console.log(resp);
  });
  else{
  let isValid = this.productService.addProduct(this.form.value).subscribe(resp => {   
    });;
    console.log(this.form.value)
    this.router.navigate(['/lista'])
}

}

}
