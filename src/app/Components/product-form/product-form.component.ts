import { AppConfig } from './../../../app.config';
import { Http } from '@angular/http';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
}) 

export class ProductFormComponent implements OnInit {
  categories;
  constructor(private cateogryService: CategoryService, private http: Http,private url:AppConfig) { }

  ngOnInit() {
   this.http.get(this.url.apiUrl+'categories').subscribe(category=>{this.categories = category
  console.log("Categories"+ this.categories)
  })
  }
}
