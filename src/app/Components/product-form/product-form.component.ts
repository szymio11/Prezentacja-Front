import { ProductUpdate } from './../../model/product';
import { Category } from './../../model/category';
import { AppConfig } from './../../../app.config';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import {  FormArray, FormBuilder,
  ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
}) 

export class ProductFormComponent implements OnInit {
  product: ProductUpdate;
  categories: Category[];
  form;
  constructor(private fb: FormBuilder,private categoryService: CategoryService,private url:AppConfig, private productService: ProductService) { 
   this.form = fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      categoryId:['',Validators.required],
      price:[]
    })
  }
  /* = new FormGroup({
    name: new FormControl('',
      Validators.required
    ),
    description: new FormControl('',
      Validators.required
    ),
    categoryId: new FormControl('',Validators.required),
    price: new FormControl()
  
  })*/
  ngOnInit() {
    this.getCategories();
  }
  
  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }
 addProduct(){
   this.productService.addProduct(this.form.value).subscribe(
   resp=> console.log(this.form.value)
   )
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
}
