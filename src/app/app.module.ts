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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DetailsProductComponent } from './Components/details-product/details-product.component';
import { TruncateModule } from '@yellowspot/ng-truncate';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    HomeComponent,
    NavComponent,
    ListProductComponent,
    DetailsProductComponent
  ],
  imports: [
    TruncateModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot([
     { 
      path: '',
      component: ListProductComponent
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
   },  
   { 
    path: 'detale/:id',
    component: DetailsProductComponent
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
