import { Category } from "./category";
export class ProductUpdate {
  name: string = "";
  description: string = "";
  category: string = "";
  price: number;
}
export class Product {
  id: string = "";
  name: string = "";
  description: string = "";
  category: Category;
  price: number;
}
