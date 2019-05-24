import { AppConfig } from "./../../../app.config";
import { HubConnection } from "@aspnet/signalr";
import { ProductService } from "./../../services/product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../model/product";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as signalR from "@aspnet/signalr";

@Component({
  selector: "app-details-product",
  templateUrl: "./details-product.component.html",
  styleUrls: ["./details-product.component.css"]
})
export class DetailsProductComponent implements OnInit {
  private _hubConnection: HubConnection | undefined;
  id;
  product: Product;
  items: string[] = [];
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private appConfig: AppConfig
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.appConfig.url + "stream")
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    this._hubConnection.stop();

    this._hubConnection.start().catch(err => {
      console.error(err.toString());
    });

    this.getProduct();
  }

  runStream() {
    this._hubConnection.stream("Counter", 10, 500).subscribe({
      next: item => {
        this.items.push(item);
      },
      complete: () => {
        this.items.push("KONIEC!");
      },
      error: err => {
        console.log("ERROR!",err);
      }
    });
  }

  getProduct(): void {
    this.productService.getByIdProduct(this.id).subscribe(
      product => {
        this.product = product;
      },
      (error: Response) => {
        if (error.status === 404) {
          this.toastr.error("Nie ma produktu o tym id w bazie!");
        } else {
          this.toastr.error("Wystąpił nie oczekiwany błąd!");
        }
      }
    );
  }
}
