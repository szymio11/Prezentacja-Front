import { CategoryService } from './services/category.service';
import { RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './Components/product-form/product-form.component';
import { HomeComponent } from './Components/home/home.component';
import { NavComponent } from './Components/nav/nav.component';
import { ListProductComponent } from './Components/list-product/list-product.component';
import { HttpModule } from '@angular/http';
import { AppConfig } from '../app.config';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    HomeComponent,
    NavComponent,
    ListProductComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
     { 
      path: '',
      component: HomeComponent
      },
     { 
      path: 'dodaj',
      component: ProductFormComponent
     },  
     { 
      path: 'lista',
      component: ListProductComponent
    },  
    { 
     path: ':id',
     component: ProductFormComponent
   }
    ])
  ],
  providers: [
    CategoryService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
