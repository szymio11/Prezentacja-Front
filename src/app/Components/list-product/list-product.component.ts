import { AppConfig } from './../../../app.config';
import { ProductService } from "./../../services/product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../model/product";
import { ToastrService } from "ngx-toastr";
import { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";
@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.css"]
})
export class ListProductComponent implements OnInit {
  products: Product[];
  private _hubConnection: HubConnection | undefined;
  public async: any;
  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private appConfig: AppConfig
  ) {}

  ngOnInit() {
    this.getProducts();
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.appConfig.url + "hub")
      .configureLogging(signalR.LogLevel.Trace)     
      .build();
    
    this._hubConnection.stop();

    this._hubConnection.start().catch(err => {
      console.error(err.toString());
    });

    this._hubConnection.on("NotificationCreate", (data: any) => {
      this.products.push(data);
    });
    this._hubConnection.on("NotificationRemove", (data: any) => {
      let productToRemove = this.products.find(a => a.id == data.id);
      this.products = this.products.filter(obj => obj !== productToRemove);
    });
  }

  getProducts(): void {
    this.productService.getProducs().subscribe(
      products => {
        this.products = products;
        console.log(products);
      },
      (error: Response) => {
        if (error.status === 404) {
          this.toastr.error("Nie ma żadnych produktów w bazie!");
        } else {
          this.toastr.error("Wystąpił nie oczekiwany błąd!");
        }
      }
    );
  }
  delete(product: Product) {
    if (!confirm("Jesteś pewny, że chcesz usunąć ten produkt?")) return;

    this.productService.delete(product.id).subscribe(
      resp => {
        this.getProducts();
      },
      (error: Response) => {
        if (error.status === 404) {
          this.toastr.error("Ten produkt został już usunięty!");
        } else {
          this.toastr.error("Wystąpił nie oczekiwany błąd!");
        }
        this.toastr.success("Produkt został usunięty!");
      }
    );
  }
}
